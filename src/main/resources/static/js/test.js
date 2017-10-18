var Container2 = React.createClass({

    getInitialState: function () {
        return {
            currentBook: this.props.currentBook,
            isChange: false
        }
    },


    load: function (id) {
        $.get('/books?action=detailed&id=' + id).done(function (data) {
            this.setState({currentBook: data});
            ReactDOM.render(<CanvasComponent image={data.image}/>, document.getElementById('image'));
        }.bind(this));
    },

    componentWillMount: function () {
        this.load(this.state.currentBook.id)
    },

    componentWillUpdate: function (nextProps, nextState) {
        if (this.props.currentBook.id != nextProps.currentBook.id) {
            this.load(nextProps.currentBook.id)
        }
    },


    render: function () {

        if (!this.state.isChange) {
            return <div id="main-panel">
                Название: <b>{this.state.currentBook.name}</b><br></br>
                Автор: <b>{this.state.currentBook.author}</b><br></br>
                Описание: <b>{this.state.currentBook.about}</b><br></br>

                <p onClick={this.setChange}>Изменить</p>

                <p onClick={this.delete}>Удалить</p>


            </div>
        } else {
            return <div id="main-panel">
                Название: <input onChange={this.setName} value={this.state.currentBook.name}/><br></br>
                Автор: <input onChange={this.setAuthor} value={this.state.currentBook.author}/><br></br>
                Описание: <input onChange={this.setAbout} value={this.state.currentBook.about}/><br></br>

                Изображение: <input type="file" onChange={this.setImage}/><br></br>


                <p onClick={this.send}>Отправить</p>

            </div>


        }
    },

    delete: function () {
        $.get('/books?action=delete&id=' + this.state.currentBook.id).done(function (data) {
            console.log("Delete")
        }.bind(this));
    },

    setChange: function () {
        this.setState({isChange: true})
    },

    send: function () {
        this.setState({isChange: false})

        $.post("/books?action=change",
            {
                name: this.state.currentBook.name,
                author: this.state.currentBook.author,
                about: this.state.currentBook.about,
                image: this.state.currentBook.image,
                id: this.state.currentBook.id,

            },
            function () {

            })

    },

    setName: function (event) {
        var newBook = {
            name: event.target.value,
            author: this.state.currentBook.author,
            about: this.state.currentBook.about,
            id: this.state.currentBook.id,
            image: this.state.currentBook.image,
        }
        this.setState({currentBook: newBook});
    },

    setAuthor: function (event) {
        var newBook = {
            name: this.state.currentBook.name,
            author: event.target.value,
            about: this.state.currentBook.about,
            id: this.state.currentBook.id,
            image: this.state.currentBook.image,
        }
        this.setState({currentBook: newBook});
    },

    setAbout: function (event) {
        var newBook = {
            name: this.state.currentBook.name,
            author: this.state.currentBook.author,
            about: event.target.value,
            id: this.state.currentBook.id,
            image: this.state.currentBook.image,
        }
        this.setState({currentBook: newBook});
    },

    setImage: function (event) {


        var ready = false;
        var result = '';
        var state = this;
        var check = function () {
            if (ready === true) {
                // do what you want with the result variable

                return;
            }
            setTimeout(check, 1000);
        }

        var reader = new FileReader();
        reader.onloadend = function () {
            // file is loaded
            console.log(state)
            result = reader.result
            var newBook = {
                name: state.state.currentBook.name,
                author: state.state.currentBook.author,
                about: state.state.currentBook.id,
                id: state.state.currentBook.id,
                image: result,
            }
            console.log("set")
            state.setState({currentBook: newBook});

            ready = true;
        };


        reader.readAsDataURL(event.target.files[0]);


    }


});

var CanvasComponent = React.createClass({

    getInitialState: function () {
        return {
            image: this.props.image
        }
    },

    componentDidMount: function () {
        this.updateCanvas(this.props.image);
    },

    componentWillUpdate: function (nextProps, nextState) {
        if (this.props.image != nextProps.image) {
            this.updateCanvas(nextProps.image)
        }

    },


    updateCanvas: function (imageSrc) {
        const ctx = this.refs.canvas.getContext('2d');
        var image = new Image();
        image.src = imageSrc;
        image.onload = function () {
            ctx.clearRect(0, 0, 100, 100);
            ctx.drawImage(image, 0, 0);
        };

    },

    render: function () {
        return (
            <canvas ref="canvas" width={100} height={100}/>
        );
    }
});


var Container = React.createClass({

    load: function () {
        console.log("Update")

        $.get('/books?action=all').done(function (data) {
            this.setState({
                listBooks: data,
                listCurrentBooks: data
            });
        }.bind(this));
    },

    getInitialState: function () {
        return {
            listBooks: [],
            listCurrentBooks: []
        }
    },

    componentWillMount: function () {
        this.load();
    },

    componentWillUpdate: function (nextProps, nextState) {
        this.load();
    },

    shouldComponentUpdate: function (nextProps, nextState) {
        // return a boolean value

        if (this.state.listBooks.length == nextState.listBooks.length) {
            return false;
        } else {
            return true;
        }
    },




    render: function () {

        var current = this;

        return <div>

            <form action="" className="search-form">
                <div className="form-group has-feedback">
                    <label form="search" className="sr-only">Search</label>
                    <input onChange={this.handleSearch} type="text" className="form-control" name="search"
                           id="search" placeholder="search"/>
                </div>
            </form>

            <ul id="list-texts" className="list-group">
                {

                    this.state.listCurrentBooks.map(function (el, index) {
                        return <li className="list-group-item" key={index}
                                   onClick={() => current.handlerMain(el)}>
                            "{el.name}", {el.author}
                        </li>

                    })
                }
            </ul>

            <button onClick={this.load} type="button" class="btn btn-default">Обновить</button>

        </div>
    },

    handlerMain: function (el) {
        $("#main").removeClass("non-visible");
        ReactDOM.render(
            <Container2 currentBook={el}/>,
            document.getElementById('container2')
        );
    },

    handleSearch: function (event) {
        $("#main").addClass("non-visible");
        var text = event.target.value.toLowerCase();

        var books = this.state.listBooks;
        var dispBooks = books.filter(function (el) {
            var name = el.name.toLowerCase();
            var author = el.author.toLowerCase();
            return (name.indexOf(text) !== -1) || (author.indexOf(text) !== -1);
        });

        this.setState({
            listCurrentBooks: dispBooks
        })

    }

});

var Head = React.createClass({

    getInitialState: function () {
        ReactDOM.render(
            <Container/>,
            document.getElementById('container')
        );
        return null;
    },


    render: function () {
        return <div class="page-header">
            <h1>Библиотека
                <small>тест</small>
            </h1>
            <p></p>
        </div>

    }

});


ReactDOM.render(
    <Head/>,
    document.getElementById('head')
);



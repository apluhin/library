package com.example.demo.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Table(name="books")
@Getter
@Setter
@ToString
public class BookEntity {

    @Id
    @GeneratedValue
    private Long id;
    private String author;
    private String name;
    private String about;
    @Column(length = 1000000)
    private String image;

    public BookEntity(String author, String name, String about, String image) {
        this.author = author;
        this.name = name;
        this.about = about;
        this.image = image;
    }

    public BookEntity() {
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        BookEntity entity = (BookEntity) o;

        if (author != null ? !author.equals(entity.author) : entity.author != null) return false;
        if (name != null ? !name.equals(entity.name) : entity.name != null) return false;
        if (about != null ? !about.equals(entity.about) : entity.about != null) return false;
        return image != null ? image.equals(entity.image) : entity.image == null;

    }

    @Override
    public int hashCode() {
        int result = author != null ? author.hashCode() : 0;
        result = 31 * result + (name != null ? name.hashCode() : 0);
        result = 31 * result + (about != null ? about.hashCode() : 0);
        result = 31 * result + (image != null ? image.hashCode() : 0);
        return result;
    }
}

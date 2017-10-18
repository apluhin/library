package com.example.demo.dto;

import com.example.demo.entity.BookEntity;
import lombok.Getter;

@Getter
public class BookExtend {

    private Long id;
    private String author;
    private String name;
    private String about;
    private String image;

    private BookExtend(BookEntity bookEntity) {
        this.id = bookEntity.getId();
        this.author = bookEntity.getAuthor();
        this.name = bookEntity.getName();
        this.about = bookEntity.getAbout();
        this.image = bookEntity.getImage();
    }

    public static BookExtend convert(BookEntity bookEntity) {
        return new BookExtend(bookEntity);
    }
}

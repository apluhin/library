package com.example.demo.dto;

import com.example.demo.entity.BookEntity;
import lombok.Getter;

@Getter
public class BookBasic {

    private Long id;
    private String name;
    private String author;

    BookBasic(BookEntity bookEntity) {
        this.id = bookEntity.getId();
        this.name = bookEntity.getName();
        this.author = bookEntity.getAuthor();
    }

    public static BookBasic convert(BookEntity bookEntity) {
        return new BookBasic(bookEntity);
    }

}

package com.example.demo.service;

import com.example.demo.dto.BookBasic;
import com.example.demo.dto.BookExtend;

import java.util.List;


public interface BookService {

    List<BookBasic> getAllBooks();

    Boolean deleteBooks(Long id);

    BookExtend getDetailedBook(Long id);

    Boolean addBook(String name, String author, String about, String image);

    Boolean changeInfoAboutBook(Long id, String name, String author, String about, String image);

}

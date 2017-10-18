package com.example.demo.controller;

import com.example.demo.dto.BookBasic;
import com.example.demo.dto.BookExtend;
import com.example.demo.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping("/books")
public class BookController {

    private final BookService bookService;

    @Autowired
    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @RequestMapping(params = "action=all", method = RequestMethod.GET)
    @ResponseBody
    public List<BookBasic> getBooks() {
        return bookService.getAllBooks();
    }

    @RequestMapping(params = "action=delete", method = RequestMethod.GET)
    @ResponseBody
    public Boolean deleteBook(Long id) {
       return bookService.deleteBooks(id);
    }


    @RequestMapping(params = "action=detailed", method = RequestMethod.GET)
    @ResponseBody
    public BookExtend getDetailed(Long id) {
        return bookService.getDetailedBook(id);
    }

    @RequestMapping(params = "action=add", method = RequestMethod.POST)
    @ResponseBody
    public Boolean addBook(String author, String name, String about, String image) {
        return bookService.addBook(author, name, about, image);
    }

    @RequestMapping(params = "action=change", method = RequestMethod.POST)
    @ResponseBody
    public Boolean changeInfo(Long id, String author, String name, String about, String image) {
        return bookService.changeInfoAboutBook(id, author, name, about, image);
    }



}

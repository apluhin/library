package com.example.demo.service;

import com.example.demo.dto.BookBasic;
import com.example.demo.dto.BookExtend;
import com.example.demo.entity.BookEntity;
import com.example.demo.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookServiceImpl implements BookService {

    private final BookRepository repository;

    @Autowired
    public BookServiceImpl(BookRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<BookBasic> getAllBooks() {
        return repository.findAll().stream().map(BookBasic::convert).collect(Collectors.toList());
    }

    @Override
    public Boolean deleteBooks(Long id) {
        repository.delete(id);
        return true;
    }

    @Override
    public BookExtend getDetailedBook(Long id) {
        return BookExtend.convert(repository.findOne(id));
    }

    @Override
    public Boolean addBook(String name, String author, String about, String image) {
        BookEntity entity = new BookEntity(name, author, about, image);
        repository.save(entity);
        return true;
    }

    @Override
    public Boolean changeInfoAboutBook(Long id, String name, String author, String about, String image) {
        BookEntity entity = repository.findOne(id);
        BookEntity test = new BookEntity(name, author, about, image);
        if(entity.equals(test)) {
            return false;
        } else {
            entity.setAbout(about);
            entity.setImage(image);
            entity.setName(name);
            entity.setAuthor(author);
            repository.save(entity);
            return true;
        }
    }


}

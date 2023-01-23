class Book{
    constructor(title,author,isbn){
        this.author=author;
        this.title=title;
        this.isbn=isbn;
    }
}
class UI{
    addbooktolist(book){
        const list= document.getElementById('booklist');
        const row = document.createElement("tr");
        row.innerHTML=`    
            <td>${book.title}</td> 
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="delete">X<a></tb>
            `;
        list.appendChild(row);
    }
    showAlert(message, classname){
        const div=document.createElement('div');
        div.className=`alert ${classname}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form=document.querySelector('#book-form');
        container.insertBefore(div,form);
        setTimeout(function(){
            document.querySelector('.alert').remove();
        },3000)
    }
    deletebook(target){
        if(target.className==="delete"){
            target.parentElement.parentElement.remove();
        }
    }
    clearfields(){
        document.getElementById('title').value='';
        document.getElementById('author').value='';
        document.getElementById('isbn').value='';
    }
}

class Store{
    static getbooks(){
        let books;
        if(localStorage.getItem('books')===null){
            books=[];
        } else{
            books=JSON.parse(localStorage.getItem("books"));
        }
        return books;
    }
    static displaybooks(){
        const books = Store.getbooks();
        books.forEach(function(book){
            const Ui=new UI;
            Ui.addbooktolist(book);
        });
    }
    static addbook(book){
        const books =Store.getbooks();
        books.push(book);
        localStorage.setItem("books",JSON.stringify(books));

    }
    static removebook(isbn){
        const books =Store.getbooks();
        books.forEach(function(book,index){
            
        if(book.isbn===isbn){
            books.splice(index,1);
        }

    });
    localStorage.setItem("books",JSON.stringify(books));}

}

document.addEventListener('DOMContentLoaded',Store.displaybooks);

document.getElementById('book-form').addEventListener('submit',
    function(e){
        
        const title= document.getElementById('title').value,
              author= document.getElementById('author').value,
              isbn= document.getElementById('isbn').value
        const book= new Book(title, author, isbn);

        const Ui = new UI(book);

        if(title===''||author===""||isbn===""){
            Ui.showAlert('pls, fill in alll fields',"error");
        }
        else{
            Ui.addbooktolist(book);
            Store.addbook(book);
            Ui.clearfields();
            Ui.showAlert('book added',"success");

        }



        e.preventDefault();
});

document.getElementById("booklist").addEventListener('click',
function(e){
    const Ui=new UI();
    Ui.deletebook(e.target);
    Store.removebook(e.target.parentElement.previousElementSibling.textContent);
    Ui.showAlert("book removed", "success")
    e.preventDefault();

});
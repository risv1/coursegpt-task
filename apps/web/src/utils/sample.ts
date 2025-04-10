export const sampleResponse = {
  title: "Rust Programming Fundamentals",
  description:
    "This course provides a comprehensive introduction to the Rust programming language, focusing on its unique features like memory safety without garbage collection, concurrency without data races, and high performance. Students will learn the basics of Rust syntax, data structures, and control flow, and will then delve into more advanced topics such as ownership, borrowing, lifetimes, and error handling. The course also covers essential concepts in systems programming, equipping students with the skills to build robust and efficient applications. By the end of this course, students will be able to write safe, concurrent, and performant Rust code and contribute to Rust-based projects. Practical exercises and real-world examples will reinforce the learned concepts. The course also introduces the cargo build system, package management and how to use crates from the Rust ecosystem.",
  totalDuration: "300",
  targetAudience:
    "Software developers, systems programmers, and anyone interested in learning a modern, safe, and performant programming language.",
  learningOutcomes: [
    "Understand Rust's core principles and syntax",
    "Write safe and concurrent Rust code",
    "Manage memory effectively using Rust's ownership system",
    "Handle errors gracefully in Rust",
    "Build and deploy Rust applications using Cargo",
  ],
  modules: [
    {
      id: 1,
      title: "Module 1: Introduction to Rust",
      description:
        "This module introduces the Rust programming language and its ecosystem. It covers the history of Rust, its key features, and its advantages over other programming languages. You'll learn how to set up your development environment, install Rust and Cargo, and write your first \"Hello, World!\" program. The module also touches on basic syntax, data types, and variables in Rust. We'll discuss why Rust is important in modern systems programming, including security benefits.",
      subtopics: [
        "History and Philosophy of Rust",
        "Setting up the Development Environment",
        "Basic Syntax and Data Types",
        "Variables and Mutability",
        "Introduction to Cargo",
      ],
      duration: "60 minutes",
      quiz: [
        {
          question: "Which of the following is a key feature of Rust?",
          options: [
            "Automatic garbage collection",
            "Memory safety without garbage collection",
            "Unlimited mutability",
            "Dynamic typing",
          ],
          correctAnswer: 1,
          explanation:
            "Rust's memory safety is achieved through its ownership system and borrow checker, without relying on garbage collection.",
        },
        {
          question: "What is Cargo?",
          options: [
            "A Rust compiler",
            "A package manager and build system",
            "A debugger",
            "A text editor",
          ],
          correctAnswer: 1,
          explanation:
            "Cargo is Rust's official package manager and build system, used for managing dependencies and building projects.",
        },
        {
          question:
            "Which keyword is used to declare a mutable variable in Rust?",
          options: ["const", "let", "mut", "var"],
          correctAnswer: 2,
          explanation:
            "The `mut` keyword is used to make a variable mutable, allowing its value to be changed after initialization.",
        },
        {
          question: "What is the primary goal of Rust's design?",
          options: ["Safety", "Performance", "Concurrency", "All of the above"],
          correctAnswer: 3,
          explanation:
            "Rust is designed to be safe, performant, and capable of handling concurrent operations effectively.",
        },
        {
          question:
            "Which of the following is NOT a primitive data type in Rust?",
          options: ["i32", "f64", "String", "bool"],
          correctAnswer: 2,
          explanation:
            "String is not a primitive type, it's a growable, UTF-8 encoded string type.",
        },
      ],
      images: [
        {
          title: "Introduction and Rust Basics | Coursera",
          imageUrl:
            "https://s3.amazonaws.com/coursera_assets/meta_images/generated/XDP/XDP~COURSE!~packt-introduction-and-rust-basics-mqdrt/XDP~COURSE!~packt-introduction-and-rust-basics-mqdrt.jpeg",
        },
        {
          title: "Rust Programming Part 1: Rust Programming Foundations",
          imageUrl:
            "https://www.oreilly.com/library/cover/9780138314378/1200w630h/",
        },
        {
          title: "Rust Tutorial #1 - Introduction To Rust Programming",
          imageUrl: "https://i.ytimg.com/vi/T_KrYLW4jw8/maxresdefault.jpg",
        },
      ],
      externalLinks: [
        {
          title: "Introduction - The Rust Programming Language",
          link: "https://doc.rust-lang.org/book/ch00-00-introduction.html",
        },
        {
          title: "Introduction - Rust By Example - Rust Documentation",
          link: "https://doc.rust-lang.org/rust-by-example/",
        },
        {
          title: "Learning Rust : 01- Intro and Setup - DEV Community",
          link: "https://dev.to/fadygrab/learning-rust-1-intro-and-setup-5a77",
        },
      ],
    },
    {
      id: 2,
      title: "Module 2: Ownership and Borrowing",
      description:
        "This module delves into Rust's core concepts of ownership, borrowing, and lifetimes. Understanding these concepts is crucial for writing safe and efficient Rust code.  We'll explore how Rust manages memory without garbage collection through the ownership system. We'll also learn about borrowing rules and how they prevent data races and dangling pointers. Finally, lifetime annotations will be introduced to specify the relationships between references. By the end of this module, you'll be able to write code that adheres to Rust's ownership rules and avoids common memory-related errors.",
      subtopics: [
        "Ownership Rules",
        "Borrowing and References",
        "Mutability and Borrowing",
        "Dangling Pointers and Data Races",
        "Lifetimes",
      ],
      duration: "60 minutes",
      quiz: [
        {
          question: "What is the primary purpose of Rust's ownership system?",
          options: [
            "Automatic memory management",
            "Preventing data races and dangling pointers",
            "Improving code readability",
            "Simplifying debugging",
          ],
          correctAnswer: 1,
          explanation:
            "The ownership system is designed to prevent memory-related errors such as data races and dangling pointers.",
        },
        {
          question:
            "According to Rust's borrowing rules, how many mutable references can exist for a single piece of data at any given time?",
          options: ["Unlimited", "Only one", "Two", "As many as needed"],
          correctAnswer: 1,
          explanation:
            "Rust allows only one mutable reference to a piece of data to prevent data races.",
        },
        {
          question: "What is a lifetime in Rust?",
          options: [
            "The duration of a variable's existence",
            "A marker for garbage collection",
            "A guarantee of memory safety",
            "A type of loop",
          ],
          correctAnswer: 0,
          explanation:
            "Lifetimes specify the relationships between references, ensuring that references do not outlive the data they point to.",
        },
        {
          question: "What happens when a variable goes out of scope in Rust?",
          options: [
            "The memory is automatically garbage collected",
            "The memory is immediately freed",
            "The variable is moved to the heap",
            "The value is leaked",
          ],
          correctAnswer: 1,
          explanation:
            "When a variable goes out of scope, Rust automatically frees the memory associated with it, unless ownership has been transferred.",
        },
        {
          question: "Which of the following is a benefit of using borrowing?",
          options: [
            "Avoids unnecessary copying of data",
            "Increases code complexity",
            "Reduces memory safety",
            "Prevents all memory errors",
          ],
          correctAnswer: 0,
          explanation:
            "Borrowing allows you to access data without taking ownership, which avoids copying and improves performance.",
        },
      ],
      images: [
        {
          title:
            "Ownership vs. Borrowing in Rust. Posted by: Caterina Valdovinos ...",
          imageUrl:
            "https://miro.medium.com/v2/resize:fit:1400/1*O4XkJLuUQ5XGda0xNMPtwQ.png",
        },
        {
          title:
            "Difference between Owner's Fund and Borrowed Fund – Tutor's Tips",
          imageUrl:
            "https://tutorstips.com/wp-content/uploads/2021/02/Difference-between-Owners-Fund-and-Borrowed-Fund-min-1.png",
        },
        {
          title: "What is Ownership? - The Rust Programming Language",
          imageUrl: "https://doc.rust-lang.org/book/img/trpl04-04.svg",
        },
      ],
      externalLinks: [
        {
          title: "Understanding Ownership - The Rust Programming Language",
          link: "https://doc.rust-lang.org/book/ch04-00-understanding-ownership.html",
        },
        {
          title:
            "Ownership and Borrowing in Rust: A Comprehensive Guide to ...",
          link: "https://medium.com/@poppyseedDev/ownership-and-borrowing-in-rust-a-comprehensive-guide-to-memory-management-27f127bb0fc9",
        },
        {
          title: "Why the ownership/borrowing model? : r/rust - Reddit",
          link: "https://www.reddit.com/r/rust/comments/vkbeuk/why_the_ownershipborrowing_model/",
        },
      ],
    },
    {
      id: 3,
      title: "Module 3: Data Structures and Enums",
      description:
        "This module introduces fundamental data structures in Rust, including structs, enums, and collections. Structs allow you to group related data together, while enums provide a way to define a type with a set of possible values. We'll explore how to define and use structs and enums effectively. Furthermore, this module introduces commonly used collections such as vectors, hash maps, and strings. You'll learn how to create, manipulate, and iterate over these data structures. This module also shows how generics can be combined with these data structures.",
      subtopics: [
        "Structs and Data Aggregation",
        "Enums and Pattern Matching",
        "Vectors and Dynamic Arrays",
        "Hash Maps and Key-Value Storage",
        "Strings and Text Manipulation",
      ],
      duration: "60 minutes",
      quiz: [
        {
          question: "What is a struct in Rust?",
          options: [
            "A collection of functions",
            "A way to define a new type by grouping related data",
            "A type of loop",
            "A memory management tool",
          ],
          correctAnswer: 1,
          explanation:
            "A struct is a composite data type that groups together related data fields.",
        },
        {
          question: "What is an enum in Rust?",
          options: [
            "A data structure for storing key-value pairs",
            "A way to define a type with a set of possible values",
            "A method for error handling",
            "A type of function",
          ],
          correctAnswer: 1,
          explanation:
            "An enum allows you to define a type that can have one of several possible values.",
        },
        {
          question: "Which of the following is a dynamic array type in Rust?",
          options: ["Array", "Tuple", "Vector", "Struct"],
          correctAnswer: 2,
          explanation:
            "A vector is a growable array type that can dynamically resize at runtime.",
        },
        {
          question:
            "Which data structure is suitable for storing key-value pairs in Rust?",
          options: ["Vector", "HashMap", "Enum", "Struct"],
          correctAnswer: 1,
          explanation:
            "HashMap is a data structure that stores key-value pairs, allowing efficient lookup by key.",
        },
        {
          question: "What is pattern matching in Rust primarily used for?",
          options: [
            "Defining new types",
            "Looping through data structures",
            "Handling different enum variants",
            "Managing memory",
          ],
          correctAnswer: 3,
          explanation:
            "Pattern matching allows you to deconstruct and handle different enum variants or struct fields in a concise and expressive way.",
        },
      ],
      images: [
        {
          title:
            "DATA STRUCTURES AND APPLICATIONS-m3 - MODULE 3:LINKED LIST ...",
          imageUrl:
            "https://website-assets.studocu.com/img/document_thumbnails/6345989dafe68b3a3810b72b85201bef/thumb_1200_1553.png",
        },
        {
          title:
            "Data Structures Module 3 QB Complete Solutions | PDF | Queue ...",
          imageUrl:
            "https://imgv2-1-f.scribdassets.com/img/document/590018364/original/432b3bdd1f/1?v=1",
        },
        {
          title:
            "DATA STRUCTURES AND APPLICATIONS-m3 - MODULE 3:LINKED LIST ...",
          imageUrl:
            "https://website-assets.studocu.com/img/document_thumbnails/b7acfa0f4ebabbf00d5111db3dad0f76/thumb_1200_1696.webp",
        },
      ],
      externalLinks: [
        {
          title: "[PDF] 17 STRUCTURE, TYPEDEF & ENUMERATED DATA TYPE - NIOS",
          link: "https://www.nios.ac.in/media/documents/330srsec/online_course_material_330/Theory/Lesson_17.pdf",
        },
        {
          title: "[PDF] MODULE 3: LINKED LIST DEFINITION - Deepak D.",
          link: "https://deepakdvallur.weebly.com/uploads/8/9/7/5/89758787/module-3.pdf",
        },
        {
          title:
            "Python 3 Data Structures | 2.1 enum: Enumeration Type - InformIT",
          link: "https://www.informit.com/articles/article.aspx?p=2808702",
        },
      ],
    },
    {
      id: 4,
      title: "Module 4: Error Handling and Input/Output",
      description:
        "This module focuses on error handling techniques and input/output operations in Rust. You'll learn how to handle errors gracefully using the `Result` type and the `?` operator. We'll explore different error handling strategies, such as propagating errors and providing custom error types. This module also covers reading from and writing to files, handling user input, and working with standard input and output streams. Error handling is important and so is proper logging and diagnostics which is touched on in this module.",
      subtopics: [
        "The `Result` Type",
        "Error Propagation",
        "Custom Error Types",
        "File Input/Output",
        "Standard Input/Output",
      ],
      duration: "60 minutes",
      quiz: [
        {
          question: "What is the purpose of the `Result` type in Rust?",
          options: [
            "To handle panics",
            "To represent the outcome of an operation that might fail",
            "To define new data types",
            "To manage memory",
          ],
          correctAnswer: 1,
          explanation:
            "The `Result` type is used to represent either success (Ok) or failure (Err) of an operation.",
        },
        {
          question: "What does the `?` operator do in Rust?",
          options: [
            "Unwraps a `Result` type and propagates the error if it's an `Err`",
            "Declares a new variable",
            "Defines a new function",
            "Handles panics",
          ],
          correctAnswer: 0,
          explanation:
            "The `?` operator unwraps a `Result` and returns the value if it's `Ok`, otherwise it returns the error.",
        },
        {
          question: "How can you create a custom error type in Rust?",
          options: [
            "Using the `error!` macro",
            "By defining a new struct or enum",
            "Using the `panic!` macro",
            "By implementing the `Error` trait",
          ],
          correctAnswer: 1,
          explanation:
            "You can define a custom error type using a struct or enum and implement the `Error` trait.",
        },
        {
          question:
            "Which module is used for file input/output operations in Rust?",
          options: ["std::io", "std::fs", "std::file", "std::path"],
          correctAnswer: 1,
          explanation:
            "The `std::fs` module provides functionalities for file system operations, including reading and writing files.",
        },
        {
          question: "What is the purpose of `panic!` in Rust?",
          options: [
            "To handle errors gracefully",
            "To terminate the program immediately",
            "To define a new function",
            "To manage memory",
          ],
          correctAnswer: 1,
          explanation:
            "`panic!` is used to signal an unrecoverable error and terminate the program execution.",
        },
      ],
      images: [
        {
          title:
            "Introduction to Mule 4: Error Handlers | MuleSoft Documentation",
          imageUrl:
            "https://docs.mulesoft.com/mule-runtime/latest/_images/error-handling-example-1.png",
        },
        {
          title:
            "Introduction to Mule 4: Error Handlers | MuleSoft Documentation",
          imageUrl:
            "https://docs.mulesoft.com/mule-runtime/latest/_images/error-handling-try.png",
        },
        {
          title:
            "Module 4 CPS -  MODULE 4 FUNCTIONS  A function as series of ...",
          imageUrl:
            "https://website-assets.studocu.com/img/document_thumbnails/07a4372cdc359e9c41a4059e457ebf3f/thumb_1200_1696.png",
        },
      ],
      externalLinks: [
        {
          title: "Handling errors in input and output operations - IBM",
          link: "https://www.ibm.com/docs/en/cobol-zos/6.4?topic=errors-handling-in-input-output-operations",
        },
        {
          title:
            "Introduction to Mule 4: Error Handlers | MuleSoft Documentation",
          link: "https://docs.mulesoft.com/mule-runtime/latest/intro-error-handlers",
        },
        {
          title: "[PDF] Chapter 11 – Input/Output and Exception Handling",
          link: "https://home.csulb.edu/~pnguyen/cecs277/lecnotes/ch11exception.pdf",
        },
      ],
    },
    {
      id: 5,
      title: "Module 5: Concurrency and Parallelism",
      description:
        "This module introduces the concepts of concurrency and parallelism in Rust. You'll learn how to create and manage threads, use channels for communication between threads, and protect shared data with mutexes. We'll explore different concurrency patterns and strategies for avoiding data races and deadlocks. Additionally, we'll explore async and await syntax for asynchronous programming. Finally, we'll learn about the Rust standard library's tools for building concurrent applications. Practical examples will demonstrate how to leverage concurrency to improve application performance. The module will cover using threads and channels for safe data sharing.",
      subtopics: [
        "Threads and Thread Management",
        "Channels and Message Passing",
        "Mutexes and Shared State",
        "Data Races and Deadlocks",
        "Asynchronous Programming",
      ],
      duration: "60 minutes",
      quiz: [
        {
          question: "What is the purpose of threads in Rust?",
          options: [
            "To manage memory",
            "To execute code concurrently",
            "To define new data types",
            "To handle errors",
          ],
          correctAnswer: 1,
          explanation:
            "Threads allow you to execute different parts of your program concurrently, improving performance.",
        },
        {
          question: "What are channels used for in concurrent Rust programs?",
          options: [
            "Managing threads",
            "Passing messages between threads",
            "Protecting shared data",
            "Handling errors",
          ],
          correctAnswer: 1,
          explanation:
            "Channels provide a safe way for threads to communicate by sending and receiving messages.",
        },
        {
          question: "What is a mutex used for in Rust?",
          options: [
            "Managing memory",
            "Protecting shared data from concurrent access",
            "Defining new data types",
            "Handling errors",
          ],
          correctAnswer: 1,
          explanation:
            "A mutex provides mutual exclusion, allowing only one thread to access shared data at a time, preventing data races.",
        },
        {
          question: "What is a data race?",
          options: [
            "A situation where multiple threads access shared data concurrently without synchronization",
            "A deadlock",
            "A type of error handled by the `Result` type",
            "A memory management issue",
          ],
          correctAnswer: 0,
          explanation:
            "A data race occurs when multiple threads access the same memory location concurrently, with at least one thread writing, without any synchronization.",
        },
        {
          question: "What is the purpose of `async` and `await` in Rust?",
          options: [
            "To manage memory",
            "To define new data types",
            "To handle synchronous operations",
            "To write asynchronous code",
          ],
          correctAnswer: 3,
          explanation:
            "`async` and `await` keywords are used to write asynchronous code that can perform non-blocking operations.",
        },
      ],
      images: [
        {
          title: "Concurrency vs. Parallelism: Key Differences and Use Cases",
          imageUrl:
            "https://media.brightdata.com/2025/04/Concurrency-vs-Parallelism-og.png",
        },
        {
          title:
            "Concurrency vs. Parallelism : A Deep Dive | by Gajendra Singh ...",
          imageUrl:
            "https://miro.medium.com/v2/resize:fit:1200/1*QRxcx2tuJpQZ2UbLP4IcEw.png",
        },
        {
          title: "Concurrency vs. Parallelism: Key Differences and Use Cases",
          imageUrl:
            "https://media.brightdata.com/2024/06/A-table-explaining-and-comparing-the-differences-between-concurrency-and-parallelism.png",
        },
      ],
      externalLinks: [
        {
          title:
            "Concurrency vs. Parallelism — A brief view | by Madhavan Nagarajan",
          link: "https://medium.com/@itIsMadhavan/concurrency-vs-parallelism-a-brief-review-b337c8dac350",
        },
        {
          title: "5.Concurrency & Parallelism - Kaggle",
          link: "https://www.kaggle.com/code/arjunvaidhyanathan/5-concurrency-parallelism",
        },
        {
          title: "Module 5 - Parallel Computing - Scribd",
          link: "https://www.scribd.com/document/514168699/Module-5",
        },
      ],
    },
  ],
};

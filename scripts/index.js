
const navbutton = document.querySelector('#nav-button');
const navbar = document.querySelector('#nav-bar');

navbutton.addEventListener('click', () => {
    navbutton.classList.toggle('show');
    navbar.classList.toggle('show');
});


/***** Copy Right ******/
const year = new Date().getFullYear();
const copyright = document.querySelector('#currentyear');
copyright.innerHTML = year;


const lastModified = document.querySelector('#lastModified');
lastModified.innerHTML = `Last Modified: ${document.lastModified}`;



/* Courses */

const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
]


const cardssection = document.querySelector('#filteredcourses');

function createCard(course) {
    const card = document.createElement('div');
    
    if (course.completed === true) {
        card.innerHTML = `<p>✓ ${course.subject} ${course.number}</p>`
    } else {
        card.innerHTML = `<p> ${course.subject} ${course.number}</p>`
    }
    return card;
}

function displayCourses(coursesToShow) {
    cardssection.innerHTML = "";

    let totalcredits = 0;

    coursesToShow.forEach(course => {
        const courseCard = createCard(course);
        cardssection.appendChild(courseCard);

        totalcredits += course.credits;
    });

    const creditstext = document.createElement("p");
    creditstext.id = "credits-text"
    creditstext.textContent = `Total credits for course listed above is ${totalcredits}`;

    cardssection.appendChild(creditstext);
};


//Update the visual status of the buttoms

function updateButtonState(activeButton) {
    
    allcoursesbutton.classList.remove('active');
    wddcoursesbutton.classList.remove('active');
    csecoursesbutton.classList.remove('active');
    
    
    activeButton.classList.add('active');
}

/** buttons */
const allcoursesbutton = document.querySelector('#AllCourses');
const wddcoursesbutton = document.querySelector('#WddCourses');
const csecoursesbutton = document.querySelector('#CseCourses');

//Filtros de los cursos

const wddfiltered = courses.filter(course => course.subject === "WDD");
const csefiltered = courses.filter(course => course.subject === "CSE");

allcoursesbutton.addEventListener('click', () => {
    displayCourses(courses);
    updateButtonState(allcoursesbutton);
});

wddcoursesbutton.addEventListener('click', () => {
    displayCourses(wddfiltered);
    updateButtonState(wddcoursesbutton);
});

csecoursesbutton.addEventListener('click', () => {
    displayCourses(csefiltered);
    updateButtonState(csecoursesbutton);
});

displayCourses(courses);
updateButtonState(allcoursesbutton);
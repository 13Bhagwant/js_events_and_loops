// JS: Events & The Loop

// Events
const toxicTeam = document.querySelector("#toxic-tim");
const teamSalmon = document.querySelector(".team.salmon");

// handling events (listening to events)
// 1. Inline event handlers => <button onclick="soSomthing();"></button>
// const doSomething = () => console.log('Did something');
// 2. DOM event handlers => window.onload = () => console.log('window loaded')

// 3. Using addEventListener() => modern way and it allows us to register as many handlers as we need 
// <selected-node>.addEventListener(<event-name>, <listener-callback>);
// this method allows us to react with a callback to events that 
// occure on a node in the browser

// Its first argument is a string that corresponds to the name of an event.
// You write any name here. It must be on the possible events.
// https://developer.mozilla.org/en-US/docs/Web/Events

// Its second argument is a callback named "listener" that is 
// called/executed when the event is triggered
// Much like setTimeout or setInterval, it is asynchronous

// Exercise: clicking on titles
// document.querySelectorAll(".doggo.fighter h1").forEach(node => {
//     node.addEventListener('click', (event) => {
//         debugger
//         console.log(`${event.currentTarget.innerText} clicked`);
//     })
// })

if (false) {
    teamSalmon.addEventListener('click', (event) => {
        console.log('Team Salmon was clicked!');
        console.log('event: ', event);
        // The 'event' object contains a host of useful information
        // about the triggered event
        // including (but not limitted to) the position of the cursor,
        // which modifier was held at the time (e.g. shift, alt, cmd, etc)
        // which node was clicked, at what datetime the event was triggered
        // etc....
        console.log('==========================');
        console.log('type: ', event.type);

        // The 'target' property refers to the node that originally
        // triggered the event. In the case of a 'click' event,
        // that is the node where the cursor was located at 
        // the time of the click.
        // It will always be a descendant of the currentTarget node,
        // Or the currentTarget node.
        console.log('target: ', event.target);
        // The 'currentTarget' property refers to the node that 
        // calls the 'addEventListener' method.
        // It si the 'listening node'.
        // In this case, it is always going to be 'teamSalmon'
        console.log('currentTarget: ', event.currentTarget);
        console.log('==============================');
    })
}

// Instance of Node
const p = document.querySelector('p');
// When document.querySelector finds nothing, it returns null
if (p instanceof Node) {
    // so since null is not an instanceof Node, this will never execute
    p.addEventListener('click', () => console.log('this was a p node'));
}

if (false) {
    toxicTeam.addEventListener('click', event => {
        console.log('target: ', event.target);
        console.log('currentTarget: ', event.currentTarget);
        console.log(`cursor position: (${event.clientX}, ${event.clientY})`);
        console.log('arrow this === currentTarget ', this === event.currentTarget);
        // 'this' is the window when using arrow function for the callback
    });

    teamSalmon.addEventListener('click', function (event) {
        console.log(
            "non-arrow this === currentTarget ",
            this === event.currentTarget
        ); // true
        // Whereas when using a non-arrow function, 'this' refers to the currentTarget
    })

    // Exercise: Last In Queue
    document.querySelectorAll('.doggo.fighter').forEach(node => {
        node.addEventListener('click', event => {
            const doggoNode = event.currentTarget;
            const rosterNode = doggoNode.closest('.roster');
            rosterNode.append(doggoNode)
        })
    })
}


// Events and the loop
// http://latentflip.com/loupe/

if (false) {
    function c() {
        console.log('c');
        setTimeout(function getFavAnimal() {
            console.log('Wolf');
        }, 0)
    }

    function b() {
        console.log('b');
        setTimeout(function getName() {
            console.log("Hindreen")
        }, 0);
        c();
    }

    function a() {
        console.log('a');
        b();
    }

    a();
}

// Event Events

// Demo: Mouse & Doggo

document.querySelectorAll('.doggo.fighter').forEach(doggoNode => {
    // dblclick
    doggoNode.addEventListener('dblclick', event => {
        console.log(`${event.currentTarget.id} was double clicked`);
        event.currentTarget.classList.toggle('inverted')
    });
    // mousedown => when you click and hold your mouse
    doggoNode.addEventListener('mousedown', event => {
        event.currentTarget.classList.add('flipped');
    });
    // mouseup => releasing your mouse click after clicking
    doggoNode.addEventListener('mouseup', event => {
        event.currentTarget.classList.remove('flipped');
    });

    // mouseleave
    doggoNode.addEventListener('mouseleave', event => {
        event.currentTarget.classList.remove('flipped');
    })

})

// Crouching Mouse Hidden Doggo

document.querySelectorAll('.doggo.fighter').forEach(doggoNode => {
    doggoNode.addEventListener('mouseenter', event => {
        event.currentTarget.classList.add('hovered')
    });
    doggoNode.addEventListener('mouseleave', event => {
        event.currentTarget.classList.remove('hovered')
    });
})

// Exercise: Where is my cursor?
const coordsDiv = document.createElement('div');
coordsDiv.style.position = 'fixed';
coordsDiv.style.bottom = '0';
coordsDiv.style.backgroundColor = "white";
coordsDiv.style.fontSize = '2em';
document.body.append(coordsDiv);
document.addEventListener('mousemove', event => {
    const position = `(${event.clientX}, ${event.clientY})`;
    coordsDiv.innerText = position;
});

// Form & inpute events

// Demo: Type Loudly & Explode on Submi
const random = n => Math.ceil(Math.random() * n)
const keySound = () => new Audio(`sounds/vintage-keyboard-${random(5)}.wav`);
document.querySelectorAll('input').forEach(inputNode => {
    inputNode.addEventListener('input', event => {
        // console.log(event.currentTarget.value);
        keySound().play();
    })
})

const explosionSound = () => new Audio("sounds/small-explosion.wav");
document.querySelector('form').addEventListener('submit', event => {
    event.preventDefault();
    // preventDefault() prevents the form from being submitted
    // this prevents the forms browser default behaviour
    // When used with forms, the form data will not be submitted somewhere
    // when used with links, the href will not be followed
    explosionSound().play();
});

if (false) {
    // Exercise: Appicant's avatar
    const applicantPreview = document.querySelector('#applicant-preview .doggo.blank');

    document
        .querySelector('input[name="picture-url"]')
        .addEventListener('input', event => {
            const imageUrl = event.currentTarget.value;
            // console.log('imageUrl: ', imageUrl);
            applicantPreview.style.backgroundImage = `url(${imageUrl})`;
        })
}

// Create Doggo on Submit
document.addEventListener('DOMContentLoaded', () => {
    document
        .querySelector("#application-form")
        .addEventListener('submit', event => {
            event.preventDefault();
            const formNode = event.currentTarget;
            // To easily access all of the input field values within a form
            // use the FormData constructor like below, passing it the form
            // as an argument
            const formData = new FormData(formNode);
            formData.get('name');
            // this 👆 search through the form input and finds an input 
            // with name="name" and gets whatever value passed down to it
            formData.get('picture-url');
            formData.get('team-name');

            // we can also use formData.entries() to get an 'itrator' for looping
            // over the input fields using a for..of loop
            // for (let field of formData.entries()) {
            //     console.log("input name: ", field[0], "input value: ", field[1])
            // }

            const blankDoggo = document.querySelector('#applicant-preview .doggo.blank');
            blankDoggo.style.backgroundImage = `url(${formData.get('picture-url')})`;
            blankDoggo.querySelector('h1').innerText = formData.get('name');
            blankDoggo.style.border = `medium solid ${formData.get('team-name')}`
        })
})

// Keyboard events
document.addEventListener('keydown', event => {
    console.log(event);
    const {
        currentTarget,
        target,
        keyCode,
        altKey,
        shiftKey,
        metaKey,
        key
    } = event;
    console.log('keyCode: ', keyCode);
    if (altKey && shiftKey && keyCode === 78) {
        window.location.href = "http://nyan.cat";
    }
})



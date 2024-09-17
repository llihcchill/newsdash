// this file contains variables that require a global state

// it will be updated when a variable used in other js files 
// need to be stored and shared among other components

// so its pretty much a worse version of Redux, which if need be
// i can swap it out for it or another lit state library, possibly
// since i'm really only using js with the lit render function i 
// could use more (hint hint nudge nudge another win for this setup)

export {
    username, 
    servers, 
}
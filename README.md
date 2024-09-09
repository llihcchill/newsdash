# newsdash

> NewsDash is a Jackbox-styled party game where each players has to either make up a news headline, or find a real one, and guess if it is real or fake.

It is not so much made like a proper video game, but is a web-app which can be run by (when starting in the /src/ directory):
```
cd server
go run server.go
```

This will start the development server. Then (if server.go has not been tinkered with) search into your browser:
```
localhost:8080
```
then press enter.

## to get people on your network able to join

1. go to your command prompt and enter `ipconfig` if on windows, or `ip` on linux
2. look for your first IPv4 address and copy it
3. paste your IPv4 address in your browser's search bar, and then append `:8080` to the end of it (should look something like `192.168.0.240:8080`)
4. search this in your browser and then the page should appear on your screen! (and, if searched on other devices connected to your network, it should appear on their screens as well!)


## for fellow developers

this project is somewhat an experiment to attempt to:

1. boil down not only the (at points unnessesary) complexity of modern web frameworks

2. simplify to the point I can get my dog to code for me. I really want to see her do that ;-;

3. have the ability to make a SPA (Single-Page Application) with ease

4. use both SSR (Server-Side Rendering) and CSR (Client-Side Rendering) optimally where you play to both of their strengths

5. must be logical and flexible

> you may read that and then read the absolute beast that is the <script> tag in the main.html file, though that is only there because i can't get imports working because of a MIME type issue of the file which i might eventually fix by using [Open Web Components'](https://open-wc.org/guides/) scaffolding thing to set it up: `npm init @open-wc`, though it adds a ton of depencies that aren't necessary, it'll help with developer experience.


## The way this has been achieved? [WebComponents](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) with [Lit](https://lit.dev/). (*plus htmx with a golang backend which i'll talk about*)

the main idea is where:

1. the server renders the initial page template (Golang web server)
2. the client renders its components on that page along with its content (Lit components)
3. to move to a different page but still have that SPA feel, the partial part of the page where components are needed are swapped with a different template with it's own components by the server (HTMX GET request)
4. repeat

and that is all. not too much to learn and neither are any of these technologies very complicated. I don't know if anything will come of it, but I think I prefer this way of developing applications to other front end frameworks (although they really aren't that bad)


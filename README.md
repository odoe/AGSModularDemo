# Modular ArcGIS JavaScript Demo

This is a sample application to demonstrate how to build a modular
JavaScript application using the [ArcGIS JavaScript](http://developers.arcgis.com/en/javascript/) API.

This is by no means an extensive application, but the principles are the
same. Build small files, string them together.

I updated this example project to use [grunt](http://gruntjs.com/) tasks to build the
application. I was using r.js, but my build file stopped working with
the latest r.js update. It's ok, the whole point was to minify my
JavaScript files and copy everything to a build folder. Once you get
started with grunt, you can use tasks to compile and optimize your less
files and even run unit tests.

Thanks the [AGRC](https://github.com/agrc/AGRCJavaScriptProjectBoilerPlate) for the inspiration. They show how to utilize the Dojo build system so you could build a single output file, which you could do with this grunt build, but I found it to be a pain to properly name my modules. I would check that project out if you want to stick with Dojo to build your apps.

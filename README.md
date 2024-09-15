# React Analytics

This project integrates uses of Tiktok pixel, Facebook pixel, Google Analytics for collecting user events on any websites with React based frontend.

## Who Should Use This 

If you are looking forward to applying event collections of the mentioned platforms, you can use the module to integrate them all.

## How Do I Make Sure that the Code Can Work?
Change the required id in the .env.develoment file, and you can test with Google Tag Assistant, Meta Pixel Helper, Tiktok Pixel Helper.

## Why Should You Trust the Code
The code confirms that all required data structions of <code>window</code> is initialized first, and events are sent to each platform after each of them is fully initialized. In other words, the events are only sent to each platform only after each of its <code>script</code>'s onload is called. If the onload is not called, the events are queued by the module and will be sent when the initialization is complete.

## Project Environment
This project is managed by <code>Nx</code> and developed by Visual Studio. So, install [Nx Console](https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console) in Visual Studio. The bundler is vite and the unittest runner is jest.


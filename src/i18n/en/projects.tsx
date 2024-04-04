import React from "react";
import { Info } from "../../components/Info";
export default {
  sonid: {
    title: "Learn musictheory with Sonid",
    desc: "educational app for musicians who want to learn more about musictheory",
    htmlText: () => (
      <article className="content">
        <Info title="Client" text="Own project" />

        <Info
          title="description"
          text={`Sonid is one of my bigger hobby projects. I love programming and music. When I was teaching kids how to play guitar, I noticed that they needed a fun way to learn musictheory. 
          This is why I started working on Sonid. With Sonid you can learn musictheory in a fun and structured order.`}
        />

        <Info
          title="What did I learn?"
          text={`First of all, I learned how to build my code in a strucured manner. I learned how to de-bug my own coding and build an app from the ground up.
          I got to know many code libraries.`}
        />
      </article>
    ),
  },
  meta: {
    title: "Meta: Assembled",
    desc: "online game for Steam",
    htmlText: () => (
      <article className="content">
        <Info title="Client" text="Own project" />

        <Info
          title="Description"
          text={`Meta: assembled was a hobbyproject to expand my knowledge. The game is still on Steam and can be played for free. It's a cardgame that's lightly inspired by Magic the Gathering and Hearthstone.`}
        />

        <Info
          title="What did I learn?"
          text={`I learned to process realtime data in the Firebase database.`}
        />
      </article>
    ),
  },

  sites: {
    title: "WordPress",
    desc: "several websites",
    htmlText: () => (
      <article className="content">
        <Info
          title="Jeruzalem Kerk"
          text={'I created a brand-new Wordpress website for the Jeruzalem Kerk Amsterdam. They wanted to attract a new audience and needed a fresh new look. The new website is easy to manage, so that the volunteers can independently add blog-posts and new events.'}
        />
        <Info
          title="Bartoon"
          text={'Bart Kranenburg is a Dutch cartoonist. He wanted a small website to display his work.'}
        />
        <Info
          title="Vincent Niekerk"
          text={'Vincent is a carpenter from Amsterdam. He wanted a nice looking website to display all of his projects. His new website brought him many new costumers and is ranking high in Google.'}
        />
      </article>
    ),
  },

  wms: {
    title: "WMS",
    desc: "Warehouse management system",
    htmlText: () => (
      <article className="content">
        <Info title="Client" text="ecBase" />
        <Info
          title="Description"
          text={'WMS is a web-application that functions as a frontend for ecBases backoffice. With this web-app clients can manage their sales and stock. A dashboard with all the relevant statistics is included.'}
        />

        <Info
          title="What I learned:"
          text={'Where to track the {state}? I learned when it is best to do this locally, globaly or through local storage. I improved my component related thinking, through creating easy-to-read and indipendent code.'}
        />
      </article>
    ),
  },

  starterApp: {
    title: "ECBase Order App",
    desc: "Whitelabel ordering application, B2B model",
    htmlText: () => (
      <article className="content">
        <Info title="Client" text="ecBase" />

        <Info
          title="Description"
          text={`The app is used by clients of affiliated companies to order products, update orderlists and view or update costumer data.
          They can search through all the products and use filters. Costumer data like orders and invoices are always up-to-date, and can be managed easily.`}
        />

        <Info
          title="What did I learn?"
          text={`I learned a lot about working with React Native and Expo. 
          I also had to work intensively with the Appstore and Play Console and had to keep track of the different release tracks with builds for development, preview, staging and production.
          Moreover, the performance of react-native on lower-end devices was a good learning experience.`}
        />
      </article>
    ),
  },

  starterNext: {
    title: "ECBase Order Commerce",
    desc: "Whitelabel ordering website, B2B model",
    htmlText: () => (
      <article>
        <Info title="Client" text="ecBase" />

        <Info
          title="Description"
          text={`This is the whitelabel ordering website for the B2B model of EcBase. 
          This is the frontend for the EcBase clients. 
          They can offer this website to there costumers, so they can place orders and have insight in their customer profile.
          The website is mostly used in the catering industry.`}
        />

        <Info
          title="What did I learn?"
          text={`- Next JS internal API;
          - Authentication and keeping track of sessions;
          - Minimalising bundle-size;
          - Imports and executing scripts for a fast page-load;
          - Filtering and sorting products;
          - Docker image with Google Filestore mount for NextJS;
          - Image cache and deploy on Google Cloud Run.`}
        />


        <Info
          title="Belangrijk om te weten"
          text="Cold-start van de site is traag door lage instellingen GCR"
        />
      </article>
    ),
  },
};


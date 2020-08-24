# upnext
upnext is a website where users can find out about upcoming show releases, where to buy them, and how to buy them. upnext users will be able to browse older generations of sneakers and interact with other users through community pages that allow them to post pictures, comment, like, and favorite.

<hr>

## Setup:
Before I even started coding, there were a few modules and API's that I needed to install. Here is a list of the most utilized ones:
-   sneaks-api
-   sequelize
-   bcrypt
-   cheerio
-   express, ejs, express-ejs-layouts
-   passport
-   pg

## Sneaks-API:
[Sneaks-API](https://github.com/druv5319/Sneaks-API) is a sneaker API created by Dhruv Patel that holds data for all of the sneakers you can think of. Data such as name, price, thumbnail, silhoutte, brand and colorway.

## Sneaker Releases:
In order to track sneaker release dates, I decided to scrape the data from the website, [Sneaker-News](https://sneakernews.com/air-jordan-release-dates/)

<hr>

## Planning:
I cannot emphasize how important proper planning is when making code. <br>
One of my favorite verses from the bible says, "Those who sow in tears shall reap with shouts of joy". <br>
To me this says, if you work/care so much and do things the right way, you will only benefit from that. <br>
__*No tears were shed during the process of making this app.*__

Here is the ERD that I created that allowed me to visualize the model's that I was creating and their associations to other models.

![ERD](./assets/erd2.png)

Here is the wireframe that I created that let me play around with different designs before actually touching any CSS. Although it may not look 100% similar, creating the wireframe beforehand saved me from deciding after the fact and having to go back and forth with CSS. 

![wireframe](./assets/wireframe.png) 

## Building the App:
upnext is comprised of node.js, express, sql, css, html, and javascript. 
It took about half a week to lay out the css and another half to set up all of the routes and models. I also use apps such as cloudpic and authapp so that users can upload images and sign up for their own accounts. 

Below are some highlights of code: 

1. In order to create my index page, I needed data that was updated constantly about the newest shoe releases. Since there were no current API's for this, I had to scrape the data from the [sneakernews](https://sneakernews.com/air-jordan-release-dates) website. Here is how I did it. 
``` javascript
router.get('/', async (req, res) => {
    const URL = await 'https://sneakernews.com/air-jordan-release-dates/'

    request(URL, (error, response, body) => {
            let $ = cheerio.load(body)
            let results = $('.releases-box')
            let filteredResults = results.map((index, element) => {
                let nameClean = $(element).find('h2', 'a').text();
                nameClean = nameClean.substring(29, nameClean.length-25)

                let sizeClean = $(element).find('p', '.post-data').text();
                sizeClean = sizeClean.substring(33, sizeClean.length-250)

                return {
                name: nameClean,
                img: $(element).find('img').attr('src'),
                date: $(element).find('span', '.release-date').text().substring(29,34),
                price: $(element).find('span[class=release-price]').text(),
                size: sizeClean,
            }
            })
            filteredResults = filteredResults.get()
            // console.log(filteredResults.get())
            res.render('index', {data: filteredResults})
    })
})
```

2. I wanted to allow users to save shoes that they thought were nice/interesting. I had to create a model for the shoes and associate that model with the user's model. This took quite a while to figure out but I was able to get it to work. Essentially, each time the favorite button is clicked, it adds its ID, thumbnail link and shoe name to the sneaker model that I created.

``` javascript
app.get('/profile/', isLoggedIn, (req, res) => {
  let favSneaker = db.sneaker.findAll()
  .then((fav) => {
      res.render('profile', {fav})
  })
});

app.post('/profile', (req, res) => {
  db.sneaker.findOrCreate({
      where: {
        styleID: req.body.id,
        thumbnail: req.body.thumbnail,
        shoeName: req.body.shoeName,
      }
  })
  .then(function() {
      res.redirect('/profile')
  })
})

app.delete('/profile',  (req, res) => {
  db.sneaker.destroy({
    where: {styleID: req.body.id}
    })
    .then(function() {
      res.redirect('/profile');
    })
})
```

## Blockers
Along the way, there were some problems that I was not able to debug. 
The main one was having user sessions and unique profile pages per user. If you notice, every user shares the same profile page. This is the first thing that I will change immediately once I have the change. This goes along with the community page where you do not know exactly who posted what and not really having control of what you post either.

## Conclusion

In conclusion, there were a lot of things that I still have planned for this app. Please continue to check for updates for I will be perfecting it soon. 
Creating upnext was quite the challenge and used a lot of concepts that were quite new to me. I'm very glad that I was able to create something that I am proud of and that I can continue to work on as I continue to learn more. 
# PizzaPizza (client)

This demo project is an online pizza ordering and delivery app. It uses the Google Places API and the Javascript Geolocation API to provide pizza delivery restaurants near the user's current location.  User's can then browse the nearby restaurants and place an order.

This project is the client side of a full-stack web app.

The project is hosted at:
https://pizzapizzadelivery.herokuapp.com

View the server repository here: 
https://github.com/Perrottarichard/pizzapizza-server

## Core Technologies
| Technology  | For |
| ------------| -------|
| React | UI building|
| Redux | state management |
| React Redux | React bindings for Redux |
| React Router | routing |
| Axios | client-server communication/CRUD operations | 
| Material-UI, CSS | styling/icons |

## Client Features
* Fully responsive UI using CSS Grid and Flexbox
* Google OAUTH2.0 user authentication
* Local email/password authentication
* browse nearby pizza delivery restaurants
* sidebar navigation
* browse locations on embedded Google Map
* distance between restaurant and user's current location, price-level, rating, and open/close status shown for each restaurant
* browse restaurant reviews
* place an order
* automatic email confirmation upon registration and order placement
* view past orders
* active orders show live progress and status (preparing, out-for-delivery, delivered)
* add/remove favorite restaurants
* apply promotional codes to receive discounts
* add/edit delivery addresses
* add/edit credit/debit cards
* pay with cash or credit/debit card
* add a tip for the driver to the credit card (optional)
* submit restaurant recommendation if not shown in results
* notifications on user actions (add favorites, submit forms, place order, etc...)




## UI (desktop)
### Login
![Alt text](https://raw.github.com/perrottarichard/pizzapizza-client/master/uiscreenshots/PPLogin.png)

### Places
![Alt text](https://raw.github.com/perrottarichard/pizzapizza-client/master/uiscreenshots/PPplaces.png)

### Cart/Order Placement
![Alt text](https://raw.github.com/perrottarichard/pizzapizza-client/master/uiscreenshots/PPCart.png)

### Order History
![Alt text](https://raw.github.com/perrottarichard/pizzapizza-client/master/uiscreenshots/PPOrders.png)

### Account Info
![Alt text](https://raw.github.com/perrottarichard/pizzapizza-client/master/uiscreenshots/PPAccount.png)

### Restaurant Details/Menu
![Alt text](https://raw.github.com/perrottarichard/pizzapizza-client/master/uiscreenshots/PPmenu.png)

### Promotions
![Alt text](https://raw.github.com/perrottarichard/pizzapizza-client/master/uiscreenshots/PPpromos.png)

### Reviews
![Alt text](https://raw.github.com/perrottarichard/pizzapizza-client/master/uiscreenshots/PPreviews.png)

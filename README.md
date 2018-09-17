## BLISSFUL-CAR

[![CircleCI](https://circleci.com/gh/tbaraza/blissful-car.svg?style=svg)](https://circleci.com/gh/tbaraza/blissful-car)
[![codecov](https://codecov.io/gh/tbaraza/blissful-car/branch/master/graph/badge.svg)](https://codecov.io/gh/tbaraza/blissful-car)

## Pre-requisites

This application utilises the following technologies

[NodeJS](https://nodejs.org/en/)  
[ReactJS](https://reactjs.org/)

## Getting started

Clone the repo by running:

```bash
git clone git@github.com:tbaraza/blissful-car.git
```

```bash
yarn install
```

## Backend

Change to frontend directory

```bash
cd backend
```

### Install dependencies

```bash
yarn install
```

### Start development server

```bash
yarn start
```

### Run tests

```bash
yarn test
```

## Frontend

Change to frontend directory

```bash
cd frontend
```

### Install dependencies

```bash
yarn install
```

### Start client development server

```bash
yarn start
```

### Run tests

```bash
yarn test
```

### Run coverage

```bash
yarn coverage
```

## Analytics

Go to `http:localhost:3000/dashboard` to view statistics

## Structure

This repository contains 2 important folders:

1. [frontend](https://github.com/tbaraza/blissful-car/tree/master/frontend)
2. [backend ](https://github.com/tbaraza/blissful-car/tree/master/backend)

This is to ensure separation of concerns such that each part of the project can evolve independently.

### Backend

The backend is responsible for storing data and servicing requests from the frontend.
Requests include search which filters the data based on the data sent with the request.

There's an analytics service layer implemented using [socket.io](https://socket.io/).
This service publishes page visit and search events.

### Frontend

The frontend should be as easy to use as possible. The user can
search for car deals based on the a set of fields but the required ones are
`passengers, insurance and best-fuel option`
A user is also able to filter the results.

There's a dashboard that displays analytics generated from page visits and searches made from the page.

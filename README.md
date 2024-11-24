# Video Game Catalogue

This simple two-page web application was built with **Angular 19**, **Bootstrap** and **Angular Router**. The application allows users to browse a list of video games, create a new video game, and edit/delete the details of an existing video game entry.

## Features

- **Browse Video Games**: View a list of video games with basic details (name, genre, rating, price, release year).
- **Add Video Game Entry**: Create a new video game.
- **Edit Video Game Entries**: Modify the details of an existing video game.
- **Delete Video Game Entry**: Delete an existing video game.

## Screenshots

![image](https://github.com/user-attachments/assets/fdd6f30f-41ea-4d14-bd14-c55db1089504)

![image](https://github.com/user-attachments/assets/b1071e27-3a31-4c91-ba45-4ced14599257)

## Technologies Used

- **Angular 19**: Building a dynamic, single-page web application.
- **Bootstrap**: A popular CSS framework for mobile-first, responsive design.
- **Angular Router**: For managing navigation and routing between the browse and edit pages.
- **TypeScript**: For better code structure, type safety, and development experience.

## Installation

### Prerequisites

- **Node.js** (LTS version)
- **npm** (Node Package Manager)

### Setup Instructions

1. Clone the repository:

    ```bash
    git clone https://github.com/patelsmit11/video-game-catalogue.git
    cd video-game-catalogue
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Start the Angular development server:

    ```bash
    ng serve
    ```

4. Open your browser and navigate to:

    ```
    http://localhost:4200
    ```
  
## Pages

- **Browse Page** (`/browse`): Displays a list of all video games.
- **Edit Page** (`/edit/:id`): Allows users to edit the details of an existing video game entry by its ID.


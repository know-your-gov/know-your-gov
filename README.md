This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Know Your Gov - Team Project

### Full Stack App created with React / Redux / Firebase Firestore / Material UI / Google Civic Info API / ProPublica

Team Project focused on tracking bills and politicians in a user-friendly way.
Will's contributions:
o Developed the Database and Auth using Firebase & Firestore
o Connected Firebase Database with Redux via Thunk middleware
o Styled Material UI components using Classes PropTypes
o Wrote unit tests for Firebase / end point tests for external APIs

Alec's contributions:
• Hit ProPublica API to get politician information and routed to individual pages via params
• Conditionally rendered multiple search methods for different politicians such as by state and by tracked
• Stored politician preferences in Firebase which counts the total votes for each to display on graph
• Styled Navigation Bar, landing page and politician list + pages with Material UI

Samuel's contributions:
• Designed some of the interaction for the ‘Bills’ tab, which required conditional rendering, pagination of results from the API and Firestore queries and bill voting functionality (favoring, opposing, deleting).
• Set up the dashboard to show representatives based on a user’s address stored in the database. An API call was made to the Google Civic API with the user’s address as a parameter.
• Set up the polling information components, using the user’s address to make calls to the Google Civic API and parsing the API response to extract polling information.

### `Dashboard View`

![alt text](images/dashboard.png)

Dashboard view that displays the users State Legislator (based on address) and upcoming elections

### `Account View`

![alt text](images/accountView.png)

User Account Page, Users are able to update their account information to display data relevant to them.

### `Bill List view`

![alt text](images/billListView.png)
Bill List page that conditionally renders recent, upcoming, favored, opposed bills. Also, a search option.

### `Politician View`

![alt text](images/politicianView.png)

Politician view, it gives the user a deeper insight on specific members of congress.

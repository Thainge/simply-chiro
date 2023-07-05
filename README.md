# SimplyChiro

[SimplyChiro Website](https://thainge.github.io/simply-chiro/)

<img src="https://github.com/Thainge/portfolio/blob/gh-pages/static/media/3.ab4e1a45e49d3927030f.png?raw=true" width="500" />

Online appointment scheduling software for Dr.Atkin's patients. Appointments can be booked and managed online with the patient dashboard, including an admin panel for Dr.Atkins to manage all appointment info, availability, and coupon codes.

## Development Explanation
### Data Modeling
- Availability, database which contains all available appointment time spans.
- Appointments, database which holds all appointments, active, upcoming, complete, and finished.
- Taken Times, database which contains a blacklist of taken appointment times.
- Coupon Codes, database which holds all coupon codes.
- Information, database which holds appointment title, description, cost, and more for the admin to easily change.
### Server Queries
- Multiple API queries for creating, updating, and deleting all of the data above.
### Web Pages
- Home
- Schedule
- Pricing
- Contact
- Dashboard
- Admin Panel
- Standalone Schedule

Copyright © 2023 Tobey Hainge All rights reserved.

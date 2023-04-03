# driven_care_api
The objective of this project is to develop a platform for scheduling medical appointments that allows patients to schedule appointments with doctors from different specialties, choosing the date and time available for each doctor.

## Business rules

1 - All doctors work from Monday to Saturday. The times being:

*Monday to Friday: 8am to 5pm. Being the break from 12h to 13h.
* Saturdays: 8 am to 12 pm without breaks.

2 - The service time will be up to 30 minutes, so the time interval that the patient can schedule is always half an hour.

3 - It will be possible to view all free times that are within up to 30 days from the current day. Example: if today is the 1st of June, the system will show the free times until the 30th of June.

4 - There can be more than one user with the same email, age and even name, but there cannot be more than one user with the same cpf.

5 - To log in, the customer must use cpf and password.


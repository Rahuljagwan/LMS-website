step 1. install vite from shadcn ui / vite installation website

step 2. follow all steps from above website

3. make pages folder and in it create ......login page

4. mongodb : password: im2AUuUYo5lNsspg username:jagwanrahul24

configuring redux and its integration::::::

1. create app /store.js
2. import configurestore form redux js toolkit
3. create a function like:

export const appStore = configureStore({reducer: {},
});

4. in main.jsx import provider from react redux and wrap the <app/> inside provider and in provider give argument as : store={appstore}

TAKEN FROM SHADCN
sheet (for mobile device navbar), dark mode , avatar, login , skeletons, badge(for completed or not completed tag in course card), Dialog (for edit profile button),table for course table,select for selecting the category of courses, progress for tracking uploading prgress, switch for toggle button,

5. for getting data from server we use "query" and for posting data to server we use "mutation"
   AnD FOR intergrating in fronted for "query" we use "{}" and for mutation we use "[]"

6. (uses "react quill" for description) for editing text

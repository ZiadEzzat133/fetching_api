import './App.css';
import axios from 'axios';
import { useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from 'react';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import TextField from '../src/Components/TextField.js';
import Button from '../src/Components/Button.js';
import Grid from '@mui/material/Grid';
import {BsTrash} from 'react-icons/bs';
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
const INITIAL_STATES =
{
  userId: '',
  title: '',
  body: '',
};
const FORM_VALIDATION = yup.object().shape({
  userId: yup.string().required("ID is required"),
  title: yup.string().required("Name is required"),
  body: yup.string().required("Body is required"),
});
function App() {
  const [posts, setPosts] = useState([
  ]);
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then((res) => {
        console.log(res.data);
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const postdelete = (id,e) => {
    e.preventDefault();
    axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then((res) => {console.log('Deleted!!!!',res);})
    .catch((err) => {console.log(err.message);});
  }
  const arr = posts.map((post) => {
    return (
      <tr>
        <td>{post.id}</td>
        <td>{post.title}</td>
        <td>{post.body}</td>
        <td><button onClick={(e) => postdelete(post.id,e)} data-tooltip-id="my-tooltip" data-tooltip-content="Delete" className='deletebtn ms-2 btn btn-danger'><BsTrash /></button></td>
        
      </tr>
    )
  })
  return (
    <div className="App">
      <h1>Get Requets</h1>
      <table className="table table-striped table-bordered my-tab">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Title</th>
            <th scope="col">Body</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {arr}
        </tbody>
      </table>
      <h1 className='mt-4'>Post Requets</h1>
      <div className='my-tab'>
        <Formik
          initialValues={{ ...INITIAL_STATES }}
          validationSchema={FORM_VALIDATION}
          onSubmit={values => {
            axios.post('https://jsonplaceholder.typicode.com/posts',{
              title: values.title,
              body:values.body,
              userId: values.userId,
            })
            .then(function (response) {
              console.log('Posted Succesflly!!!',response);
            })
            .catch(function (error) {
              console.log(error);
            });
          }}>
          <Form>
            <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
                <TextField name="userId" label="User ID" />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField name="title" label="Title" />
              </Grid>
              <Grid item xs={12}>
                <TextField name="body" label="Body" multiline={true} rows={4} />
              </Grid>
              <Grid item xs={12}>
                <Button name='Post Data' />
              </Grid>
            </Grid>
          </Form>
        </Formik>
        <Tooltip place="right" id="my-tooltip" />
      </div>

    </div>
  );
}

export default App;

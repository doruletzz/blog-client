import { ChangeEvent, useState } from 'react'

import { Form, Button } from 'react-bootstrap';
import { Post } from '../redux/blog/types/post';

const PostAddForm = () => {

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event: any) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        const title = form.elements.title.value as string;
        const slug = form.elements.slug.value as string;
        const summary = form.elements.summary.value as string;
        const imageURL = form.elements.imageURL.value as string;
        const contentFile = form.elements.content.value as string;

        const post = { 
            id: -1, 
            title: title, 
            slug: slug, 
            summary: summary, 
            user: "dorletz", 
            imageUrl: imageURL, 
            content: contentFile 
        } as Post;

        console.log(post);

        setValidated(true);


    };

    return (
        <>
            <h1>Upload your blog post here</h1>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group controlId='formBasic' className="mt-5">
                    <Form.FloatingLabel controlId="slug" label="slug" className="mb-5">
                        <Form.Control required type="text" placeholder="slug-me" />
                    </Form.FloatingLabel>

                    <Form.FloatingLabel controlId="title" label="title" className="mb-5">
                        <Form.Control required type="text" placeholder="title me" />
                    </Form.FloatingLabel>

                    <Form.FloatingLabel controlId="summary" label="summary" className="mb-5">
                        <Form.Control required type="text" placeholder="very short summary over here" />
                    </Form.FloatingLabel>

                    <Form.FloatingLabel controlId="imageUrl" label="imageURL" className="mb-5">
                        <Form.Control type="text" placeholder="url to cover image" />
                    </Form.FloatingLabel>

                    <Form.Group className="mb-5">
                        <Form.Label controlId="content">Content (markdown file)</Form.Label>
                        <Form.Control required type="file" />
                    </Form.Group>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </>
    )
}

export default PostAddForm;
import { ChangeEvent, useState } from 'react'

import { Form, Button } from 'react-bootstrap';
import { usePostDispatch } from '../redux/app/hooks';
import { savePost } from '../redux/blog/slice';
import { Post } from '../redux/blog/types/post';


const PostAddForm = () => {

    // const readFile = async (file: File, content: string) => {
    //     let reader = new FileReader();

    //     reader.onload =  (e: Event) => {
    //         if(reader.result !== null)
    //             content = content.concat(reader.result.toString());
    //             reader.readAsText(file);

    //         // console.log(reader.result, content);
    //     };

    //     reader.readAsText(file);

    //     console.log(await content);
    // }

    const dispatch = usePostDispatch();
    const [validated, setValidated] = useState(false);

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        const form = event.currentTarget;

        console.log(form);

        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            // return;
        }

        const title = form.elements.title.value as string;
        const slug = form.elements.slug.value as string;
        const summary = form.elements.summary.value as string;
        const imageURL = form.elements.imageUrl.value as string | undefined;
        const contentFile = form.elements.content.files[0] as File;

        let content = contentFile.text();

        console.log(await content);
        // readFile(contentFile, content);

        const post = {
            title: title,
            slug: slug,
            summary: summary,
            user: "dorletz",
            imageUrl: imageURL ? imageURL : null,
            content: await content
        } as Post;

        setValidated(true);
        dispatch(savePost(post));

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

                    <Form.Group controlId="content" className="mb-5">
                        <Form.Label>Content (markdown file)</Form.Label>
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
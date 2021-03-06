import { ChangeEvent, useState } from 'react';

import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { usePostDispatch } from '../../redux/app/hooks';
import { savePost } from '../../redux/blog/slice';
import { Post, Tag } from '../../redux/blog/types/post';

const PostAddForm = () => {
	const navigate = useNavigate();

	const dispatch = usePostDispatch();
	const [validated, setValidated] = useState(false);

	const handleSubmit = async (event: any) => {
		event.preventDefault();

		const form = event.currentTarget;

		console.log(form);

		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
			return;
		}

		const title = form.title.value as string;
		const slug = form.slug.value as string;
		const summary = form.elements.summary.value as string;
		const imageURL = form.elements.imageUrl.value as string | undefined;
		const tagChecks = (
			Object.values(form.tag) as Array<HTMLInputElement>
		).map((value: HTMLInputElement) => value.checked);
		const tags = Object.keys(Tag).filter(
			(key, idx) => tagChecks[idx]
		) as Array<string>;
		const contentFile = form.elements.content.files[0] as File;

		let content = contentFile.text();

		console.log(await content);
		// readFile(contentFile, content);

		const post = {
			title: title,
			slug: slug,
			summary: summary,
			user: 'dorletz',
			imageUrl: imageURL ? imageURL : null,
			createdAt: new Date(),
			updatedAt: undefined,
			content: await content,
			tags,
		} as Post;

		setValidated(true);
		await dispatch(savePost(post));
		navigate('/');
	};

	return (
		<>
			<h1>Upload your blog post here</h1>
			<Form noValidate validated={validated} onSubmit={handleSubmit}>
				<Form.Group controlId='formBasic' className='mt-5'>
					<Form.FloatingLabel
						controlId='slug'
						label='slug'
						className='mb-5'
					>
						<Form.Control
							required
							type='text'
							placeholder='slug-me'
						/>
					</Form.FloatingLabel>

					<Form.FloatingLabel
						controlId='title'
						label='title'
						className='mb-5'
					>
						<Form.Control
							required
							type='text'
							placeholder='title me'
						/>
					</Form.FloatingLabel>

					<Form.FloatingLabel
						controlId='summary'
						label='summary'
						className='mb-5'
					>
						<Form.Control
							required
							type='text'
							placeholder='very short summary over here'
						/>
					</Form.FloatingLabel>

					<Form.Group className='mb-5'>
						<Form.Label>Tags</Form.Label>
						<br />
						{Object.keys(Tag)
							.filter((value) => typeof value === 'string')
							.map((tag) => (
								<Form.Check
									inline
									type='checkbox'
									label={tag}
									key={tag}
									id={'tag'}
								/>
							))}
					</Form.Group>

					<Form.FloatingLabel
						controlId='imageUrl'
						label='imageURL'
						className='mb-5'
					>
						<Form.Control
							type='text'
							placeholder='url to cover image'
						/>
					</Form.FloatingLabel>

					<Form.Group controlId='content' className='mb-5'>
						<Form.Label>Content (markdown file)</Form.Label>
						<Form.Control required type='file' />
					</Form.Group>
				</Form.Group>

				<Button variant='primary' type='submit'>
					Submit
				</Button>
			</Form>
		</>
	);
};

export default PostAddForm;

import React from 'react';
import { Container, Button, Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Tag } from '../redux/blog/types/post';

type PostCardType = {
	title: string;
	slug: string;
	summary: string;
	tags: Array<Tag>;
	createdAt: Date | undefined;
};

const PostCard = ({ title, summary, createdAt, slug, tags }: PostCardType) => {
	console.log(tags);

	return (
		<Card>
			<Card.Body>
				<Card.Title as={Link} to={`/post/${slug}`}>
					{title}
				</Card.Title>
				<Card.Subtitle>
					{createdAt && createdAt.toString()}
				</Card.Subtitle>
				<Card.Text>
					{summary}
					<br />
					{tags && tags.join(', ')}
				</Card.Text>
			</Card.Body>
		</Card>
	);
};

export default PostCard;

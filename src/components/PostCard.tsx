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
	updatedAt: Date | undefined;
	imageUrl?: string;
};

const PostCard = ({
	title,
	summary,
	createdAt,
	updatedAt,
	slug,
	tags,
	imageUrl,
}: PostCardType) => {
	console.log(imageUrl);

	return (
		<Card>
			<Card.Body>
				<Row>
					<Col md={2}>
						{imageUrl && <Card.Img src={imageUrl} height='100%' />}
					</Col>
					<Col>
						<Card.Title as={Link} to={`/post/${slug}`}>
							{title}
						</Card.Title>
						<Card.Subtitle>
							{`createdAt: ${createdAt && createdAt.toString()}`}
							<br />
							{`updatedAt: ${updatedAt && updatedAt.toString()}`}
						</Card.Subtitle>
						<Card.Text>
							{`summary:  ${summary}`}
							<br />
							{`tags: ${tags && tags.join(', ')}`}
						</Card.Text>
					</Col>
				</Row>
			</Card.Body>
		</Card>
	);
};

export default PostCard;

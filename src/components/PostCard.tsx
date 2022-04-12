import React from 'react'
import { Container, Button, Card, Row, Col } from 'react-bootstrap'


type PostCardType = {
    title: string,
    summary: string,
    createdAt: Date | undefined,
}

const PostCard = ({ title, summary, createdAt }: PostCardType) => {
    return (
            <Card>
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Subtitle>{createdAt && createdAt.toString()}</Card.Subtitle>
                    <Card.Text>{summary}</Card.Text>
                </Card.Body>
            </Card>
    )
}

export default PostCard
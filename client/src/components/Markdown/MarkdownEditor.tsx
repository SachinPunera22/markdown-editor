import React from 'react';
import {Field, Form, Formik} from 'formik';
import * as Yup from 'yup';
import SocketService from '../../services/socketService';
import {useMarkdown} from "../../hooks/useMarkdown";


interface FormValues {
    markdown: string;
}

const MarkdownEditor: React.FC = () => {
    const initialValues: FormValues = {
        markdown: ''
    };
    const {setHtml, setError} = useMarkdown();

    const handleMarkdownChange = (value: string) => {
        // Emit socket event for markdown conversion
        SocketService.convertMarkdown(value, (response) => {
            if (response.success) {
                setHtml(response.html);
            } else {
                console.error('Markdown conversion error:', response.error);
                setError(response.error);
            }
        });
    };

    return (
        <div className="card h-100">
            <div className="card-header">
                <h5 className="card-title">Markdown Input</h5>
            </div>
            <div className="card-body">
                <Formik
                    initialValues={initialValues}
                    onSubmit={() => {
                    }}
                >
                    {({}) => (
                        <Form>
                            <Field
                                as="textarea"
                                name="markdown"
                                className={`form-control`}
                                rows={22}
                                onKeyUp={(e: any) => {
                                    handleMarkdownChange(e.target.value);
                                }}
                                placeholder="Write your markdown here..."
                            />

                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default MarkdownEditor;
import { useState } from "react";

const CommentForm = () => {
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        comment: ''
    });
    const [errors, setErrors] = useState<{ name?: string; comment?: string }>({});

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: '', // Clear error on change
        }));
    };

    const validate = () => {
        const newErrors: { name?: string; comment?: string } = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.comment.trim()) newErrors.comment = 'Comment is required';
        return newErrors;
    };

    const reset = () => {
        setFormData({ name: '', comment: '' });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        fetch('https://formsubmit.co/ajax/wrappixelvidhi@gmail.com', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                name: formData.name,
                comment: formData.comment
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setSubmitted(data.success);
                reset();
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-3">
                <h4 className="font-semibold text-navyGray dark:text-white">Leave a Comment on this post</h4>
                <div className="bg-primary/10 rounded-md flex flex-col items-center px-5 py-14">
                    <form onSubmit={handleSubmit} className='flex flex-col max-w-3xl w-full bg-white dark:bg-surfaceDark rounded-md shadow-card p-5 sm:p-8 gap-4'>
                        <div className='w-full flex flex-col gap-2'>
                            <input
                                className='input-class'
                                id='name'
                                type='text'
                                name='name'
                                placeholder='Name'
                                value={formData.name}
                                onChange={handleChange}
                            />
                            {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
                        </div>
                        <div className='w-full flex flex-col gap-2'>
                            <textarea
                                className='input-class'
                                id='comment'
                                rows={2}
                                name='comment'
                                placeholder='Your Comment'
                                value={formData.comment}
                                onChange={handleChange}
                            />
                            {errors.comment && <span className="text-red-500 text-sm">{errors.comment}</span>}
                        </div>

                        <div>
                            <button
                                type='submit'
                                className='bg-primary/85 text-white font-semibold px-10 py-4 rounded-md hover:bg-primary transition-colors cursor-pointer'>
                                Send Comment
                            </button>
                            {submitted && <p className="font-medium text-primary mt-5">Thank you for Submitting!</p>}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CommentForm;

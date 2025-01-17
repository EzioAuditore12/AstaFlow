const asyncHandler = (fn) => async (req, res, next) => {
    try {
        await fn(req, res, next);
    } catch (error) {
        console.error('Error details:', {
            message: error.message,
            stack: error.stack,
            name: error.name
        });
        
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || 'Internal Server Error',
            errors: error.errors || [],
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
}

export { asyncHandler }
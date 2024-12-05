const calculateAvgRating = reviews => {
    

    const ratedReviews = reviews.filter(item => item.rating !== null && item.rating > 0);

    const totalRating = reviews?.reduce((acc, item)=> acc + item.rating, 0)
    const avgRating = 
        ratedReviews.length > 0 
        ? (totalRating / ratedReviews.length).toFixed(1) 
        : 0;
    // const avgRating = 
    //   totalRating === 0 
    //     ? " " 
    //     : totalRating === 1 
    //     ? totalRating 
    //     : totalRating/ reviews ?.length;

    return {
        totalRating,
        avgRating
    }
}

export default calculateAvgRating
interface StarSummaryProps{
    totalStars: number;
}

function StarSummary({ totalStars} : StarSummaryProps){
    return (
        <section>
            <h2>Suma total de estrellas</h2>
            <p>{totalStars} ⭐</p>
        </section>
    );
}

export default StarSummary;
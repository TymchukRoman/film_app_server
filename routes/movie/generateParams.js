const generateParams = (params) => {
    let searchParams = { $and: [] };

    if (params.text) {
        searchParams.$and.push(
            {
                $or: [
                    {
                        plot: { $regex: '.*' + params.text + '.*' }
                    },
                    {
                        title: { $regex: '.*' + params.text + '.*' }
                    },
                    {
                        fullplot: { $regex: '.*' + params.text + '.*' }
                    }
                ]
            }
        )
    }

    if (params.genres) {
        searchParams.$and.push(
            {
                genres: { $all: [...params.genres] }
            }
        )
    }

    if (params.year) {
        searchParams.$and.push(
            {
                year: { $gt: params.year.from, $lt: params.year.to }
            }
        )
    }

    if (params.imdb) {
        searchParams.$and.push(
            {
                "imdb.rating": { $gt: params.imdb }
            }
        )
    }

    if (params.type) {
        searchParams.$and.push(
            {
                type: params.type
            }
        )
    }

    return searchParams;
}

module.exports = generateParams;
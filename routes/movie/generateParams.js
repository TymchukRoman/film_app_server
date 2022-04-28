const generateParams = (params) => {
    let searchParams = { $and: [] };

    if (params.text) {
        const textFilterArray = [];

        textFilterArray.push({ title: { $regex: new RegExp(params.text, "i") } });

        if (params.textInPlot) {
            textFilterArray.push({ plot: { $regex: new RegExp(params.text, "i") } }, { fullplot: { $regex: new RegExp(params.text, "i") } });
        }

        searchParams.$and.push(
            {
                $or: [...textFilterArray]
            }
        )
    }

    if (params.genres?.length) {
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

    if (params.types?.length) {
        searchParams.$and.push(
            {
                type: { $in: [...params.types] }
            }
        )
    }

    if (params.witPoster) {
        searchParams.$and.push(
            {
                poster: { $exists: true, $ne: null }
            }
        )
    }

    return searchParams;
}

module.exports = generateParams;
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
                year: { $gte: params.year.from, $lte: params.year.to }
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

    if (params.directors) {
        searchParams.$and.push(
            {
                directors: { $all: [...params.directors] }
            }
        )
    }

    if (params.writers) {
        searchParams.$and.push(
            {
                writers: { $all: [...params.writers] }
            }
        )
    }

    if (params.countries) {
        searchParams.$and.push(
            {
                countries: { $all: [...params.countries] }
            }
        )
    }

    if (params.cast) {
        searchParams.$and.push(
            {
                cast: { $all: [...params.cast] }
            }
        )
    }

    if (params.languages) {
        searchParams.$and.push(
            {
                languages: { $all: [...params.languages] }
            }
        )
    }

    if (params.rates?.length) {
        searchParams.$and.push(
            {
                rated: { $in: [...params.rates] }
            }
        )
    }

    if (!searchParams?.$and?.length) {
        return {};
    }

    return searchParams;
}

module.exports = generateParams;
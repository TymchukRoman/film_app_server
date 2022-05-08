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

    if (params.withPoster) {
        searchParams.$and.push(
            {
                poster: { $exists: true, $nin: [undefined, "", null] }
            }
        )
    }

    if (params.directors?.length) {
        searchParams.$and.push(
            {
                directors: { $in: [...params.directors] }
            }
        )
    }

    if (params.writers?.length) {
        searchParams.$and.push(
            {
                writers: { $in: [...params.writers] }
            }
        )
    }

    if (params.countries?.length) {
        searchParams.$and.push(
            {
                countries: { $in: [...params.countries] }
            }
        )
    }

    if (params.actors?.length) {
        searchParams.$and.push(
            {
                cast: { $in: [...params.actors] }
            }
        )
    }

    if (params.languages?.length) {
        searchParams.$and.push(
            {
                languages: { $in: [...params.languages] }
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
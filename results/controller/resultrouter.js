function listAction(request, response) {
    response.render(__dirname + '/results/view/results')
}

module.exports = {
    listResults
}
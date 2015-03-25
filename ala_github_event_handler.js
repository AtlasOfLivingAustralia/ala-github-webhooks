var spawn      = require('child_process').spawn;
var githubhook = require('githubhook');

// some helpers
var get_branches_names = function (array_of_branches) {
    return array_of_branches.map( function (val, index, arr) {
	return val['name'];
    });
};

var find_branch = function (array_of_branches, branch_name) {
    return array_of_branches.indexOf(branch_name) > -1;
};

// create the listener
var github = githubhook({
    host:   "127.0.0.1",
    port:   "2345",
    secret: process.env.GITHUB_WEBHOOKS_SECRET,
    path:   "/github/webhooks"
});

// register the handler/callback fot the 'status' github event
github.on('status', function (repo, ref, data) {
    var context = data['context'],
	state = data['state'],
        branches = get_branches_names(data['branches']);

    if ((context === 'continuous-integration/travis-ci/push') && (state !== 'pending') && find_branch(branches, 'master')) {
	// TODO: push these jobs on a queue to enforce they are run one-by-one in the same order we received them?
	refresh_build_summary_script = spawn('./refresh_build_summary.sh', [data['target_url']]);
    }
});

// start listening for github events
github.listen();

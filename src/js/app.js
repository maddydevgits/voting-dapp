App = {
	
	web3Provider: null,
	contracts: {},

	init: async function() {

		return await App.initWeb3();
	},

	initWeb3: async function() {

		if(window.web3) {
			App.web3Provider = window.web3.currentProvider;
		}
		else {
			App.web3Provider = new Web3.providers.HttpProvider('http://localahost:7545');
		}

		web3 = new Web3(App.web3Provider);
		return App.initContract();
	},

	initContract: function() {

		$.getJSON('election.json',function(data){

			var electionArtifact = data;
			App.contracts.election = TruffleContract(electionArtifact);
			App.contracts.election.setProvider(App.web3Provider);

			return App.displayVotes();
		});
			return App.bindEvents();
	},

	bindEvents: function() {
		$(document).on('click', '.btn-vote', App.handleVote);
	},

	displayVotes: function() {

		var electionInstance;

		App.contracts.election.deployed().then(function(instance){

			electionInstance=instance;
			return electionInstance.viewVote.call();

		}).then(function(votes){
			
			document.getElementById('v1').innerHTML = votes[0]['c'][0];
			document.getElementById('v2').innerHTML = votes[1]['c'][0];
			document.getElementById('v3').innerHTML = votes[2]['c'][0];

		}).catch(function(err){
			console.log(err.message);
		});
	},

	handleVote: function(event) {
		event.preventDefault();

		var electionInstance;
		var Id = parseInt($(event.target).data('id'));

		web3.eth.getAccounts(function(error,accounts){
			if(error){
				console.log(error);
			}
			var account=accounts[0];
			console.log(account);

			App.contracts.election.deployed().then(function(instance){
				
				electionInstance=instance;
				return electionInstance.castVote(Id,{from:account});

			}).then(function(result){
				console.log(account);
				document.getElementById('add').innerHTML = account;
				return App.displayVotes();
			
			}).catch(function(err){
				console.log(err.message);
			});

		});
	}
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
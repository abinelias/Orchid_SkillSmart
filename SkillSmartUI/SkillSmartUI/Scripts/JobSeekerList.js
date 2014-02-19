$(document).ready(function ()
{
    var rootUrl = 'http://localhost:2043';
    var apiUrl = '/api/JobSeeker/GetAllJobSeekers';   
    var viewModel =
    {
        persons: ko.observableArray(),
        URL: ko.observable('Views/11/JobSeekerEdit.html')

    };

    ko.applyBindings(viewModel, document.getElementById('form_div'));
    var that = this;

    $.ajax({
        url: rootUrl + apiUrl,
        type: 'GET',
        dataType: 'JSON',
       
        success: function (data) 
        {
            for (da in data)
            {
                var person = {
                    FirstName: ko.observable(''),
                    LastName: ko.observable(''),
                    Email: ko.observable(''),
                    Birthday: ko.observable(''),
                    Id:ko.observable('')
                };
                Uid = data[da].Id;
                person.FirstName(data[da].FirstName);
                person.LastName(data[da].LastName);
                person.Email(data[da].Email);
                person.Birthday(data[da].Birthday);
                viewModel.persons.push(person);
                $(".test").wrap('<a href=JobSeekerEdit.html?id=' + Uid + '>');
            }

            
        },
        error: function (xhr, status, error) {
            alert('Error :' + status);
        }
    });     
});



   /* function listviewModel()
    {
        var that = this;
        that.res =
            {
                JobSeekerList: [{ Id: "1", FirstName: "Jane", LastName: "S", Birthday: "20-1-1989", Email: "jane@gmail.com" },
                { Id: "2", FirstName: "Le viewModel = ko.mapping.fromJS(data);
        ko.applyBindings(viewModel, $('#person').get(0));
    },
ah", LastName: "V", Birthday: "29-12-1988", Email: "leah@gmail.com" },
                { Id: "3", FirstName: "June", LastName: "J", Birthday: "12-3-1985", Email: "june@gmail.com" }]
            }
    };
    function viewModel()
    {
        var self = this;
        self.anotherObservableArray = ko.observableArray([
        { FirstName: "Mike", Birthday: "5-2-1998" },
        { FirstName: "George", Birthday: "7-7-1988" },
        { FirstName: "Sam", Birthday: "25-3-1990" },
        { FirstName: "Ronald", Birthday: "15-6-1990" },
        { FirstName: "William", Birthday: "12-3-1988" }
        ]);
        alert('The length of the array is ' + anotherObservableArray().length);
        alert('The first element is ' + anotherObservableArray()[0].FirstName);
        //anotherObservableArray.reverse();
        self.submit = function ()
        {
            alert("submit");
            for(var i=0; i<anotherObservableArray().length; i++)
            {
                anotherObservableArray()[i].FirstName = anotherObservableArray()[i].FirstName;
                alert(anotherObservableArray()[i].FirstName);
            };
        };
    };
    
    ko.applyBindings(viewModel);

  
});*/
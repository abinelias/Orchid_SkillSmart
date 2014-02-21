$(document).ready(function () {
    var mustEqual = function (val, other)
    {
        return val == other();
    };

    var url = window.location.href;
    var id = url.substring(url.lastIndexOf('=') + 1);
    
    var _vm = new employeeVM(id);
    $(function ()
    {
        ko.applyBindings(_vm);
    });


    function employee(id)
    {
        var rootUrl = 'http://localhost:2043';
        var apiUrl = '/api/JobSeeker/' + id;
        var result;

        $.ajax({
            url: rootUrl + apiUrl,
            type: 'GET',
            async: false,
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                result = data;
            },
            error: function (xhr, status, error) {
                alert('Error :' + status);
            }
        });

        var jsonObject = ko.toJS(result);
        var that = this;
        that.firstname = ko.observable(jsonObject.FirstName).extend({
            required: true,
            minLength: 3,
            pattern: {
                message: 'Please check firstname',
                params: '^([A-Za-z]*)$'
            }
        });
        that.lastname = ko.observable(jsonObject.LastName).extend({ required: { message: "Last name required" } });
        that.email = ko.observable(jsonObject.Email).extend({ email: true, required: { message: "Email required" } });
        that.birthday = ko.observable(jsonObject.Birthday).extend({ required: { message: "Birthday required" } });
        that.username = ko.observable(jsonObject.UserName).extend({ required: { message: "User name required" } });
        that.password = ko.observable(jsonObject.Password).extend({ required: { params: true, message: "Password is required." } });
        that.passwordconfirm = ko.observable(jsonObject.Password).extend(
        {
            validation: { validator: mustEqual, message: 'Passwords do not match.', params: that.password }
        });       
        that.validationModel = ko.validatedObservable
        ({
            firstname: that.firstname,
            lastname: that.lastname,
            birthday: that.birthday,
            username: that.username,
            password: that.password,
            email: that.email,
            passwordconfirm: that.passwordconfirm
        });
    };
    
    function employeeVM(id)
    {
        var that = this;
        that.employee = new employee(id);      
        that.submit = function () {
            var mail = that.employee.email();
            if (that.employee.validationModel.isValid())
            {
                var jsonobject = ko.toJS(that.employee);
                var rootUrl = 'http://localhost:2043';
                var apiUrl  = '/api/JobSeeker/'+id;
                var dataObj = JSON.stringify(jsonobject);

                $.ajax({
                    url: rootUrl + apiUrl,
                    type: "PUT",
                    data: dataObj,
                    contentType: "application/json; charset=utf-8",
                    async: false,
                    success: function (data) {
                        alert('Job Seeker has been updated.');
                        window.location = "JobSeekerList.html"
                    },
                    error: function (xhr, error) {
                        alert('Error :' + error);
                    }
                });
            }
            else
            {
                that.employee.validationModel.errors.showAllMessages();
            }
        };
    };
});
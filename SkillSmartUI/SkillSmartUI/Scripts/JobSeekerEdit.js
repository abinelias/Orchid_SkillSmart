$(document).ready(function () {
    var mustEqual = function (val, other) {
        return val == other();
    };
    //var url = window.location.pathname;
    var url = window.location.href;
    var id = url.substring(url.lastIndexOf('=') + 1);    
    alert(id);
    function employee()
    {
        var jsonObject= { Id: "1", FirstName: "Jane", LastName: "S", Birthday: "20-1-1989", Email: "jane@gmail.com" }
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
        that.username = ko.observable().extend({ required: { message: "User name required" } });
        that.password = ko.observable("").extend({ required: { params: true, message: "Password is required." } });
        that.passwordconfirm = ko.observable("").extend(
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



    function employeeVM() {
        var that = this;
        that.employee = new employee();      
        that.submit = function () {
            var mail = that.employee.email();
            if (that.employee.validationModel.isValid()) {
                var jsonobject = ko.toJS(that.employee);
                //alert(JSON.stringify(jsonobject));
                window.location = "JobSeekerList.html"
            }
            else {
                that.employee.validationModel.errors.showAllMessages();
            }
        };
    };

    var _vm = new employeeVM();
    $(function () {

        ko.applyBindings(_vm);
    });
});
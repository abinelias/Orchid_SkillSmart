$(document).ready(function ()
{
    var mustEqual = function (val, other)
    {
        return val == other();
    };
    
    function employee()
    {
        var that = this;
        that.firstname = ko.observable("").extend({required: true,minLength: 3,pattern: {message: 'Please check firstname',params: '^([A-Za-z]*)$'}});
        that.lastname = ko.observable("").extend({ required: { message: "Last name required" } });
        that.email = ko.observable("").extend({ email: true, required: { message: "Email required" } });
        that.birthday = ko.observable("").extend({ required: { message: "Birthday required" } });
        that.username = ko.observable("").extend({ required: { message: "User name required" } });
        that.password = ko.observable("").extend({ required: { params: true, message: "Password is required." } });
        that.passwordconfirm = ko.observable("").extend(
        {
            validation: { validator: mustEqual, message: 'Passwords do not match.', params: that.password }
        });
        /*that.fullname = ko.computed(function () {
            return that.firstname() + " " + that.lastname();
        });*/

        that.validationModel = ko.validatedObservable
        ({
            firstname: that.firstname,
            lastname: that.lastname,
            birthday: that.birthday,
            username:that.username,
            password: that.password,
            email: that.email,
            passwordconfirm: that.passwordconfirm
        });
    };



    function employeeVM() {
        var that = this;
        that.employee = new employee();
        that.reset = function () {
            that.employee.firstname("");
            that.employee.lastname("");
            that.employee.email("");
            that.employee.birthday("");
            that.employee.username("");
            that.employee.password("");
            that.employee.passwordconfirm("");
        };
        that.submit = function ()
        {
            if (that.employee.validationModel.isValid())
            {
                var jsonobject = ko.toJSON(that.employee);
                alert(jsonobject.length);
                window.location = "JobSeekerList.html"
            }
            else
            {
                that.employee.validationModel.errors.showAllMessages();
            }
        };
    };

    var _vm = new employeeVM();
    $(function () {

        ko.applyBindings(_vm);
    });
});
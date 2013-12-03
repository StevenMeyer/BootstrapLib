(function(forms, set) {
    (function(FormControls, set) {
        set += ": ";
        test(set + "Test create input controls", function() {
            var text, password, datetime, datetimeLocal, date, month, time, week, number, email, url, search, tel, color;
            
            text = FormControls.prototype.createInput();
            ok(text.is("input") && text.attr("type") === "text", "Default input should be of type 'text'");
            
            password = FormControls.prototype.createInput(FormControls.prototype.inputTypes.PASSWORD);
            ok(password.is("input") && password.attr("type") === FormControls.prototype.inputTypes.PASSWORD, "Password input should be of the type '" + FormControls.prototype.inputTypes.PASSWORD + "'");
            
            datetime = FormControls.prototype.createInput(FormControls.prototype.inputTypes.DATETIME);
            ok(datetime.is("input") && datetime.attr("type") === FormControls.prototype.inputTypes.DATETIME, "Datetime input should be of the type '" + FormControls.prototype.inputTypes.DATETIME + "'");
            
            datetimeLocal = FormControls.prototype.createInput(FormControls.prototype.inputTypes.DATETIMELOCAL);
            ok(datetimeLocal.is("input") && datetimeLocal.attr("type") === FormControls.prototype.inputTypes.DATETIMELOCAL, "Datetime-local input should be of the type '" + FormControls.prototype.inputTypes.DATETIMELOCAL + "'");
            
            date = FormControls.prototype.createInput(FormControls.prototype.inputTypes.DATE);
            ok(date.is("input") && date.attr("type") === FormControls.prototype.inputTypes.DATE, "Date input should be of the type '" + FormControls.prototype.inputTypes.DATE + "'");
            
            month = FormControls.prototype.createInput(FormControls.prototype.inputTypes.MONTH);
            ok(month.is("input") && month.attr("type") === FormControls.prototype.inputTypes.MONTH, "Month input should be of the type '" + FormControls.prototype.inputTypes.MONTH + "'");
            
            time = FormControls.prototype.createInput(FormControls.prototype.inputTypes.TIME);
            ok(time.is("input") && time.attr("type") === FormControls.prototype.inputTypes.TIME, "Time input should be of the type '" + FormControls.prototype.inputTypes.TIME + "'");
            
            week = FormControls.prototype.createInput(FormControls.prototype.inputTypes.WEEK);
            ok(week.is("input") && week.attr("type") === FormControls.prototype.inputTypes.WEEK, "Week input should be of the type '" + FormControls.prototype.inputTypes.WEEK + "'");
            
            number = FormControls.prototype.createInput(FormControls.prototype.inputTypes.NUMBER);
            ok(number.is("input") && number.attr("type") === FormControls.prototype.inputTypes.NUMBER, "Number input should be of the type '" + FormControls.prototype.inputTypes.NUMBER + "'");
            
            email = FormControls.prototype.createInput(FormControls.prototype.inputTypes.EMAIL);
            ok(email.is("input") && email.attr("type") === FormControls.prototype.inputTypes.EMAIL, "E-mail input should be of the type '" + FormControls.prototype.inputTypes.EMAIL + "'");
            
            url = FormControls.prototype.createInput(FormControls.prototype.inputTypes.URL);
            ok(url.is("input") && url.attr("type") === FormControls.prototype.inputTypes.URL, "URL input should be of the type '" + FormControls.prototype.inputTypes.URL + "'");
            
            search = FormControls.prototype.createInput(FormControls.prototype.inputTypes.SEARCH);
            ok(search.is("input") && search.attr("type") === FormControls.prototype.inputTypes.SEARCH, "Search input should be of the type '" + FormControls.prototype.inputTypes.SEARCH + "'");
            
            tel = FormControls.prototype.createInput(FormControls.prototype.inputTypes.TEL);
            ok(tel.is("input") && tel.attr("type") === FormControls.prototype.inputTypes.TEL, "Telephone input should be of the type '" + FormControls.prototype.inputTypes.TEL + "'");
            
            color = FormControls.prototype.createInput(FormControls.prototype.inputTypes.COLOR);
            ok(color.is("input") && color.attr("type") === FormControls.prototype.inputTypes.COLOR, "Color input should be of the type '" + FormControls.prototype.inputTypes.COLOR + "'");
        });
        
        test(set + "Create input with ID", function() {
            var input, id;
            
            input = new FormControls.prototype.createInput(FormControls.prototype.inputTypes.TEXT);
            equal(input.attr("id"), undefined, "An input without an ID argument should not have an id attribute");
            
            id = "myID";
            input = new FormControls.prototype.createInput(FormControls.prototype.inputTypes.TEXT, id);
            equal(input.attr("id"), id, "Element should have the ID " + id);
        });
    }(forms.FormControls, ".FormControls"));
}(uk.co.stevenmeyer.bootstrap.css.forms, "css.forms"));
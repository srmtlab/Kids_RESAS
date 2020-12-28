class ApplicationController < ActionController::Base

    def after_sign_in_path_for(resource)
        # See: https://github.com/heartcombo/devise/wiki/How-To:-Redirect-to-a-specific-page-on-successful-sign-in
        teacher_index_path
    end
end

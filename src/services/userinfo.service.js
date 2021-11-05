import transform_mongoose_error from 'mongoose-validation-error-handler';

import UserInfo from '../models/userinfo.model';

const updateUserInfoService = async (params) => {
  try {
    const { email } = params;
    const filter = { email };

    const doc = await UserInfo.findOneAndUpdate(filter, params, {
      new: true,
      upsert: true,
      runValidators: true,
    });
    return doc;
  } catch (error) {
    const formattedError = transform_mongoose_error(error, {
      capitalize: true,
      humanize: true,
    })[0];
    throw Error(JSON.stringify(formattedError));
  }
};

export default updateUserInfoService;

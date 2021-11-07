import updateUserInfoService from '../services/userinfo.service';
import recommendationEngine from '../engine/recommendationEngine';

const updateUserInfoController = async (req, res, next) => {
  const { firstName, address, children, childrenNumber, occupation, email } =
    req.body;
  const childrenBool = children.toLowerCase() === 'yes';

  try {
    const userInfo = await updateUserInfoService({
      firstName: firstName.trim(),
      address: address.trim(),
      children: childrenBool,
      childrenNumber: childrenBool ? parseInt(childrenNumber, 10) : 0,
      email,
      occupation,
    });

    const recommendation = recommendationEngine(userInfo);

    return res.status(200).json({
      status: 'OK',
      data: recommendation,
    });
  } catch (error) {
    const { field, message } = JSON.parse(error.message);
    return next({ status: 400, error: { field, message } });
  }
};

export default updateUserInfoController;

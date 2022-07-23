'use strict';

const { uid } = require('../../helpers/uid');
const { User } = require('../../models/user');

const all = async (params) => {
  try {
    const page = params.page ? parseInt(params.page) : 1;
    const limit = params.limit ? parseInt(params.limit) : 100;
    const offset = (page * limit) - limit;

    const user = await User.findAll({
      limit: limit,
      offset: offset,
      order: [
        [params.order_by || 'updated_date', params.order_dir || 'DESC']
      ],
    });

    return {
      metadata: { http_code: 200, page, limit },
      data: user
    };
  } catch (error) {
    console.error('Error: Unable to execute all user.admin => ', error);
    
    return {
      metadata: { http_code: 500 },
      error: { message: 'unable_to_handle_request' },
    };
  }
};

const create = async (params) => {
  try {
    const now = Date.now();
    let user = await User.create({
      id: uid(),      
      created_date: now,
      updated_date: now,
      email: params.email,
      password: params.password,
      birth_date: params.birth_date,
      birth_place: params.birth_place,
      address: params.address,
      phone_number: params.phone_number,
      name: params.name,
    });

    return {
      metadata: { http_code: 201 },
      data: user,
    };
  } catch (error) {
    console.error('Error: Unable to execute create user.admin ', error);
    
    return {
      metadata: { http_code: 500 },
      error: { message: 'unable_to_handle_request' },
    };
  }
};

const show = async (id) => {
  try {
    const user = await User.findOne({
      where: {
        id,
      }
    });

    if (!user) {
      return {
        metadata: { http_code: 404 },
        error: { message: 'record_not_found' },
      };
    }

    return {
      metadata: { http_code: 200 },
      data: user
    };
  } catch (error) {
    console.error('Error: Unable to execute show user.admin ', error);
    
    return {
      metadata: { http_code: 500 },
      error: { message: 'unable_to_handle_request' },
    };
  }
};

const update = async (id, params) => {
  try {
    // data validation
    let user = await User.findOne({
      where: {
        id,
      }
    });

    if (!user) {
      return {
        metadata: { http_code: 404 },
        error: { message: 'record_not_found' },
      };
    }
    // data validation

    // data preparation
    const data = {
      updated_date: Date.now()
    };

    if (params['name']) {
      data['name'] = params['name'];
    }

    if (params['password']) {
      data['password'] = params['password'];
    }

    if (params['birth_date']) {
      data['birth_date'] = params['birth_date'];
    }

    if (params['birth_place']) {
      data['birth_place'] = params['birth_place'];
    }

    if (params['address']) {
      data['address'] = params['address'];
    }

    if (params['phone_number']) {
      data['phone_number'] = params['phone_number'];
    }

    // data preparation end

    user = await user.update(data);

    return {
      metadata: { http_code: 200 },
      data: user
    };
  } catch (error) {
    console.error('Error: Unable to execute update user.admin ', error);
    
    return {
      metadata: { http_code: 500 },
      error: { message: 'unable_to_handle_request' },
    };
  }
};

const destroy = async (id) => {
  try {
    // data validation
    const user = await User.findOne({
      where: {
        id,
      }
    });

    if (!user) {
      return {
        metadata: { http_code: 404 },
        error: { message: 'record_not_found' },
      };
    }
    // data validation

    await User.destroy({
      where: { id }
    });

    return {
      metadata: { http_code: 200 },
      data: {
        message: 'record_has_been_deleted',
        user
      }
    };
  } catch (error) {
    console.error('Error: Unable to execute destroy user.admin ', error);
    
    return {
      metadata: { http_code: 500 },
      error: { message: 'unable_to_handle_request' },
    };
  }
};

module.exports = {
  all,
  create,
  show,
  update,
  destroy
};
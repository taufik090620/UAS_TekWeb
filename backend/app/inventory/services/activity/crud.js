'use strict';

const { uid } = require('../../helpers/uid');
const { Activity } = require('../../models/activity');

const all = async (params) => {
  try {
    const page = params.page ? parseInt(params.page) : 1;
    const limit = params.limit ? parseInt(params.limit) : 100;
    const offset = (page * limit) - limit;

    const activity = await Activity.findAll({
      limit: limit,
      offset: offset,
      order: [
        [params.order_by || 'updated_date', params.order_dir || 'DESC']
      ],
    });

    return {
      metadata: { http_code: 200, page, limit },
      data: activity
    };
  } catch (error) {
    console.error('Error: Unable to execute all activity.admin => ', error);
    
    return {
      metadata: { http_code: 500 },
      error: { message: 'unable_to_handle_request' },
    };
  }
};

const   create = async (params) => {
  try {
    const now = Date.now();
    let activity = await Activity.create({
      id: uid(),      
      created_date: now,
      updated_date: now,

      name: params.name,
      description: params.description,
      sub_organization_id: params.sub_organization_id,
      pic: params.pic,
    });

    return {
      metadata: { http_code: 201 },
      data: activity,
    };
  } catch (error) {
    console.error('Error: Unable to execute create activity.admin ', error);
    
    return {
      metadata: { http_code: 500 },
      error: { message: 'unable_to_handle_request' },
    };
  }
};

const show = async (id) => {
  try {
    const activity = await Activity.findOne({
      where: {
        id,
      }
    });

    if (!activity) {
      return {
        metadata: { http_code: 404 },
        error: { message: 'record_not_found' },
      };
    }

    return {
      metadata: { http_code: 200 },
      data: activity
    };
  } catch (error) {
    console.error('Error: Unable to execute show activity.admin ', error);
    
    return {
      metadata: { http_code: 500 },
      error: { message: 'unable_to_handle_request' },
    };
  }
};

const update = async (id, params) => {
  try {
    // data validation
    let activity = await Activity.findOne({
      where: {
        id,
      }
    });

    if (!activity) {
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

    if (params['description']) {
      data['description'] = params['description'];
    }

    if (params['sub_organization_id']) {
      data['sub_organization_id'] = params['sub_organization_id'];
    }

    if (params['pic']) {
      data['pic'] = params['pic'];
    }

    // data preparation end

    activity = await activity.update(data);

    return {
      metadata: { http_code: 200 },
      data: activity
    };
  } catch (error) {
    console.error('Error: Unable to execute update activity.admin ', error);
    
    return {
      metadata: { http_code: 500 },
      error: { message: 'unable_to_handle_request' },
    };
  }
};

const destroy = async (id) => {
  try {
    // data validation
    const activity = await Activity.findOne({
      where: {
        id,
      }
    });

    if (!activity) {
      return {
        metadata: { http_code: 404 },
        error: { message: 'record_not_found' },
      };
    }
    // data validation

    await Activity.destroy({
      where: { id }
    });

    return {
      metadata: { http_code: 200 },
      data: {
        message: 'record_has_been_deleted',
        activity
      }
    };
  } catch (error) {
    console.error('Error: Unable to execute destroy activity.admin ', error);
    
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
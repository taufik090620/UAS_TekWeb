'use strict';

const { uid } = require('../../helpers/uid');
const { SubOrganizations } = require('../../models/sub_organization');

const all = async (params) => {
  try {
    const page = params.page ? parseInt(params.page) : 1;
    const limit = params.limit ? parseInt(params.limit) : 100;
    const offset = (page * limit) - limit;

    const subOrganization = await SubOrganizations.findAll({
      limit: limit,
      offset: offset,
      order: [
        [params.order_by || 'updated_date', params.order_dir || 'DESC']
      ],
    });

    return {
      metadata: { http_code: 200, page, limit },
      data: subOrganization
    };
  } catch (error) {
    console.error('Error: Unable to execute all subOrganization.admin => ', error);
    
    return {
      metadata: { http_code: 500 },
      error: { message: 'unable_to_handle_request' },
    };
  }
};

const create = async (params) => {
  try {
    const now = Date.now();
    let subOrganization = await SubOrganizations.create({
      id: uid(),      
      created_date: now,
      updated_date: now,

      name: params.name,
      description: params.description,
      address: params.address,
      user_id: params.user_id,
    });

    return {
      metadata: { http_code: 201 },
      data: subOrganization,
    };
  } catch (error) {
    console.error('Error: Unable to execute create subOrganization.admin ', error);
    
    return {
      metadata: { http_code: 500 },
      error: { message: 'unable_to_handle_request' },
    };
  }
};

const show = async (id) => {
  try {
    const subOrganization = await SubOrganizations.findOne({
      where: {
        id,
      }
    });

    if (!subOrganization) {
      return {
        metadata: { http_code: 404 },
        error: { message: 'record_not_found' },
      };
    }

    return {
      metadata: { http_code: 200 },
      data: subOrganization
    };
  } catch (error) {
    console.error('Error: Unable to execute show subOrganization.admin ', error);
    
    return {
      metadata: { http_code: 500 },
      error: { message: 'unable_to_handle_request' },
    };
  }
};

const update = async (id, params) => {
  try {
    // data validation
    let subOrganization = await SubOrganizations.findOne({
      where: {
        id,
      }
    });

    if (!subOrganization) {
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

    if (params['address']) {
      data['address'] = params['address'];
    }

    // data preparation end

    subOrganization = await subOrganization.update(data);

    return {
      metadata: { http_code: 200 },
      data: subOrganization
    };
  } catch (error) {
    console.error('Error: Unable to execute update subOrganization.admin ', error);
    
    return {
      metadata: { http_code: 500 },
      error: { message: 'unable_to_handle_request' },
    };
  }
};

const destroy = async (id) => {
  try {
    // data validation
    const subOrganization = await SubOrganizations.findOne({
      where: {
        id,
      }
    });

    if (!subOrganization) {
      return {
        metadata: { http_code: 404 },
        error: { message: 'record_not_found' },
      };
    }
    // data validation

    await SubOrganizations.destroy({
      where: { id }
    });

    return {
      metadata: { http_code: 200 },
      data: {
        message: 'record_has_been_deleted',
        subOrganization
      }
    };
  } catch (error) {
    console.error('Error: Unable to execute destroy subOrganization.admin ', error);
    
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